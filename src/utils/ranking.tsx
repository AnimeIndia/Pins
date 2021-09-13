import PixivApi from 'pixiv-api-client';
import { AppConfig } from './AppConfig';
const pixiv = new PixivApi();


export async function getRanking (options: any) {
  const REFRESH_TOKEN = "IojvOw76YzpH0d0HUZHzfdAOnQH84d9k-hS3vULmhf4";
  await pixiv.refreshAccessToken(REFRESH_TOKEN);
  // console.log(options);
  const curDate = new Date();
  curDate.setDate(curDate.getDate() - 1);
  const offset = options.offset || 0;

  const illustIds = await pixiv.illustRanking({date: curDate.toISOString().slice(0,10), mode: 'day', offset: offset});
  var imagesData = []
  for(let i = 0; i<Math.min(15, illustIds.illusts.length); i++) {
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
    const proxyImageUrl = imageUrl.replace(AppConfig.pixivImagePrefix, AppConfig.reverseProxyPrefix);
    // const imageData = imageUrl.replace('i.pximg.net', 'i.pixiv.cat');

    // console.log(proxyImageUrl);
    imagesData.push({
      imageUrl: proxyImageUrl,
      title: pixivData.title,
      author: pixivData.user.name
    });
  }
  return {
    imagesData: imagesData
  };
}

const RANKING = async (options: any) => {

  const rankingData = await getRanking(options);
  return rankingData;
}

export { RANKING };