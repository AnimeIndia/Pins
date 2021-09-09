import type { NextApiRequest, NextApiResponse } from 'next'
import PixivApi from 'pixiv-api-client';

const pixiv = new PixivApi();

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
  const curDate = new Date();
  curDate.setDate(curDate.getDate() - 1);
  
  const illustIds = await pixiv.illustRanking({date: curDate.toISOString().slice(0,10), mode: 'day'});
  var imagesData = []
  for(let i = 0; i<Math.min(10, illustIds.illusts.length); i++) {
    // let illustId = illustIds[i];
    let pixivData = illustIds.illusts[i];
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
    const proxyImageUrl = imageUrl.replace('i.pximg.net', 'i.loli.best');
    // const imageData = imageUrl.replace('i.pximg.net', 'i.pixiv.cat');

    console.log(proxyImageUrl);
    imagesData.push({
      imageUrl: proxyImageUrl,
      title: pixivData.title,
      author: pixivData.user.name
    });
  }

  res.status(200).json({imagesData: imagesData})
}

export default handler;