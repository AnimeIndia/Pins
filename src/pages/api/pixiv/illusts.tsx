import type { NextApiRequest, NextApiResponse } from 'next'
import PixivApi from 'pixiv-api-client';
import { AppConfig } from '../../../utils/AppConfig';

const pixiv = new PixivApi();
const DATE_OFFSET = 2;
// type imagesData = {
//   name: string
// }

// async function getImageData(imageUrl: string) {
//   const REFERRER  = "http://www.pixiv.net/";

//   return await axios.get(imageUrl, {
//     headers: {
//           "Referer": REFERRER
//         },
//         responseType: 'arraybuffer'
//   })
//   .then(response => "data:image/jpeg;base64, " + Buffer.from(response.data, 'binary').toString('base64'));
// }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const REFRESH_TOKEN = "IojvOw76YzpH0d0HUZHzfdAOnQH84d9k-hS3vULmhf4";
  await pixiv.refreshAccessToken(REFRESH_TOKEN);
  // const illustIds = [91953835, 91929350, 88653135, 88287478, 88302957, 91953835, 91929350, 88653135, 88287478, 88302957]
  // 88653135, 88287478, 88302957, 91929350, 88653135, 88287478, 88302957
  // const word = 'ラブライブ';
  const curDate = new Date();
  curDate.setDate(curDate.getDate() - DATE_OFFSET);
  // console.log(req.query);
  const offset = req.query.offset || 0;
  const mode = req.query.mode || 'day';
  var date = curDate;
  try {
    if(req.query.date)
     date = new Date(req.query.date.toString()) ;
  } 
  catch(e) {date = curDate;} 
  finally {if (date.getDate() > curDate.getDate()) date = curDate;}
  const illustIds = await pixiv.illustRanking({date: date.toISOString().slice(0,10), mode: mode, offset: offset});
  // const illustIds = await pixiv.illustRelated(91953835);
  var imagesData = []
  
  for(let i = 0; i<Math.min(15, illustIds.illusts.length); i++) {
    // let illustId = illustIds[i];
    let pixivData = illustIds.illusts[i];
    if(!pixivData)
      continue;
    // console.log(pixivData);
    const selectedImage = pixivData.image_urls;
    // const selectedImage = images[Math.floor(Math.random() * images.length)];
    // const image =
    //     selectedImage.large ||
    //     selectedImage.medium ||
    //     selectedImage.square_medium;
    var imageUrl: string = selectedImage.large
    var origImageUrl = pixivData.meta_single_page.original_image_url;
    if (!origImageUrl) 
      origImageUrl = imageUrl;
    //const imageData = await getImageData(imageUrl);
    // const imageData = imageUrl;
    const proxyImageUrl = imageUrl.replace(AppConfig.pixivImagePrefix, AppConfig.reverseProxyPrefix);
    // const proxyImageUrl = imageUrl.replace('i.pximg.net', 'i.pixiv.cat');

    // console.log(proxyImageUrl);
    imagesData.push({
      imageUrl: proxyImageUrl,
      title: pixivData.title,
      author: pixivData.user.name,
      width: pixivData.width,
      height: pixivData.height,
    });
  }
  res.status(200).json({imagesData: imagesData})
}

export default handler;