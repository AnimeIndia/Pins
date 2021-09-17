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

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  const REFRESH_TOKEN = "IojvOw76YzpH0d0HUZHzfdAOnQH84d9k-hS3vULmhf4";
  await pixiv.refreshAccessToken(REFRESH_TOKEN);
  // const illustIds = [91953835, 91929350, 88653135, 88287478, 88302957, 91953835, 91929350, 88653135, 88287478, 88302957]
  // 88653135, 88287478, 88302957, 91929350, 88653135, 88287478, 88302957
  // const word = 'ラブライブ';
  // var imagesData = []

  const curDate = new Date();
  curDate.setDate(curDate.getDate() - DATE_OFFSET);
  
  const illustIds = await pixiv.illustRanking({date: curDate.toISOString().slice(0,10), mode: 'day'});
  const randomIllustID = illustIds.illusts[Math.floor((Math.random()*100000) % illustIds.illusts.length)]
  const randomIllustImageUrl = randomIllustID.image_urls.large;

  const randomProxyIllustImageUrl = randomIllustImageUrl.replace(AppConfig.pixivImagePrefix, AppConfig.reverseProxyPrefix);

  // for(let i = 0; i<illustIds.length; i++) {
  //   let illustId = illustIds[i];
  //   let pixivData = await pixiv.illustDetail(illustId);
  //   // console.log(pixivData);
  //   const selectedImage = pixivData.illust.image_urls;
  //   // const selectedImage = images[Math.floor(Math.random() * images.length)];
  //   const image =
  //       selectedImage.large ||
  //       selectedImage.medium ||
  //       selectedImage.square_medium;
  //   var imageUrl: string = selectedImage.large
  //   var origImageUrl = pixivData.illust.meta_single_page.original_image_url;
  //   if (!origImageUrl) 
  //     origImageUrl = imageUrl;
  //   //const imageData = await getImageData(imageUrl);
  //   const imageData = imageUrl.replace('i.pximg.net', 'i.loli.best');
  //   // const imageData = imageUrl.replace('i.pximg.net', 'i.pixiv.cat');

  //   console.log(imageData);
  //   imagesData.push(imageData);
  // }
  // return {
  //   props: {
  //     imagesData: imagesData
  //   }
  // }
  res.status(200).json({randomIllustImageUrl: randomProxyIllustImageUrl})
}

export default handler;