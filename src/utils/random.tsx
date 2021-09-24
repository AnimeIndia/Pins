import PixivApi from 'pixiv-api-client';
import { AppConfig } from './AppConfig';

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
// export const getServerSideProps: GetServerSideProps = async () => {
//   const REFRESH_TOKEN = "IojvOw76YzpH0d0HUZHzfdAOnQH84d9k-hS3vULmhf4";
//   await pixiv.refreshAccessToken(REFRESH_TOKEN);
//   // const illustIds = [91953835, 91929350, 88653135, 88287478, 88302957, 91953835, 91929350, 88653135, 88287478, 88302957]
//   // 88653135, 88287478, 88302957, 91929350, 88653135, 88287478, 88302957
//   // const word = 'ラブライブ';
//   // var imagesData = []

//   const curDate = new Date();
//   curDate.setDate(curDate.getDate() - 1);
  
//   const illustIds = await pixiv.illustRanking({date: curDate.toISOString().slice(0,10), mode: 'day'});
//   const randomIllustID = illustIds.illusts[Math.floor((Math.random()*100000) % illustIds.illusts.length)]
//   const origImageUrl = randomIllustID.meta_single_page.original_image_url;
//   const randomIllustImageUrl = origImageUrl || randomIllustID.image_urls.medium;
//   // console.log(illustIds.illusts.length);
//   const randomProxyIllustImageUrl = randomIllustImageUrl.replace('i.pximg.net', 'i.loli.best');
// ;
//   return {
//     props: {
//       randomBgImageData: randomProxyIllustImageUrl
//     } // will be passed to the page component as props
//   }
// }

export async function getImageData () {
  const REFRESH_TOKEN = "IojvOw76YzpH0d0HUZHzfdAOnQH84d9k-hS3vULmhf4";
  await pixiv.refreshAccessToken(REFRESH_TOKEN);
  // const illustIds = [91953835, 91929350, 88653135, 88287478, 88302957, 91953835, 91929350, 88653135, 88287478, 88302957]
  // 88653135, 88287478, 88302957, 91929350, 88653135, 88287478, 88302957
  // const word = 'ラブライブ';
  // var imagesData = []

  const curDate = new Date();
  curDate.setDate(curDate.getDate() - DATE_OFFSET);
  
  const illustIds = await pixiv.illustRanking({date: curDate.toISOString().slice(0,10), mode: 'week'});
  const randomIllustID = illustIds.illusts[Math.floor((Math.random()*100000) % illustIds.illusts.length)]
  // const origImageUrl = randomIllustID.meta_single_page.original_image_url;
  const randomIllustImageUrl = randomIllustID.image_urls.medium;
  // console.log(illustIds.illusts.length);
  const randomProxyIllustImageUrl = randomIllustImageUrl.replace(AppConfig.pixivImagePrefix, AppConfig.reverseProxyPrefix);

  return {
    randomIllustImageUrl: randomProxyIllustImageUrl
  };
}

const RANDOM = async () => {
  // const REFRESH_TOKEN = "IojvOw76YzpH0d0HUZHzfdAOnQH84d9k-hS3vULmhf4";
  // await pixiv.refreshAccessToken(REFRESH_TOKEN);
  // // const illustIds = [91953835, 91929350, 88653135, 88287478, 88302957, 91953835, 91929350, 88653135, 88287478, 88302957]
  // // 88653135, 88287478, 88302957, 91929350, 88653135, 88287478, 88302957
  // // const word = 'ラブライブ';
  // // var imagesData = []

  // const curDate = new Date();
  // curDate.setDate(curDate.getDate() - 1);
  
  // const illustIds = await pixiv.illustRanking({date: curDate.toISOString().slice(0,10), mode: 'day'});
  // const randomIllustID = illustIds.illusts[Math.floor((Math.random()*100000) % illustIds.illusts.length)]
  // const origImageUrl = randomIllustID.meta_single_page.original_image_url;
  // const randomIllustImageUrl = origImageUrl || randomIllustID.image_urls.medium;
  // // console.log(illustIds.illusts.length);
  // const randomProxyIllustImageUrl = randomIllustImageUrl.replace('i.pximg.net', 'i.loli.best');
  // const randomIllustImageUrl = await getImageData();;
  const bgImageData = await getImageData();
  return {
    randomIllustImageUrl: bgImageData.randomIllustImageUrl
  };
}

export default { RANDOM };