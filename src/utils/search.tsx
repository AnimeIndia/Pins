import PixivApi from 'pixiv-api-client';
import { AppConfig } from './AppConfig';
const pixiv = new PixivApi();

export async function getSearchData (options: any) {
  const REFRESH_TOKEN = "IojvOw76YzpH0d0HUZHzfdAOnQH84d9k-hS3vULmhf4";
  await pixiv.refreshAccessToken(REFRESH_TOKEN);
  // console.log(options);
  // const curDate = new Date();
  const word = options.word;
  // const search_target = options.search_target || 'partial_match_for_tags';
  // const sort = options.sort || 'date_desc';
  const page = options.page || 1;
  const offset = options.offset || 0;
  // var start_date: Date = curDate;
  // try {
  //   if(options.start_date)
  //   start_date = new Date(options.start_date.toString()) ;
  // } 
  // catch(e) {start_date = curDate;}   // const end_date = req.query.end_date || curDate;

  const illustIds = await pixiv.searchIllust(word,
    {offset: offset, p: page}
    );
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
      author: pixivData.user.name,
      width: pixivData.width,
      height: pixivData.height,
    });
  }
  return {
    imagesData: imagesData
  };
}

const SEARCH = async (options: any) => {

  const searchData = await getSearchData(options);
  return searchData;
}

export { SEARCH };