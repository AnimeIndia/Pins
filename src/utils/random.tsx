import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import PixivApi from 'pixiv-api-client';

const pixiv = new PixivApi();

type imagesData = {
  name: string
}

async function getImageData(imageUrl: string) {
  const REFERRER  = "http://www.pixiv.net/";

  return await axios.get(imageUrl, {
    headers: {
          "Referer": REFERRER
        },
        responseType: 'arraybuffer'
  })
  .then(response => "data:image/jpeg;base64, " + Buffer.from(response.data, 'binary').toString('base64'));
}

const RANDOM = async () => {
  const REFRESH_TOKEN = "IojvOw76YzpH0d0HUZHzfdAOnQH84d9k-hS3vULmhf4";
  await pixiv.refreshAccessToken(REFRESH_TOKEN);
  // const illustIds = [91953835, 91929350, 88653135, 88287478, 88302957, 91953835, 91929350, 88653135, 88287478, 88302957]
  // 88653135, 88287478, 88302957, 91929350, 88653135, 88287478, 88302957
  const word = 'ラブライブ';
  var imagesData = []

  const curDate = new Date();
  curDate.setDate(curDate.getDate() - 1);
  
  const illustIds = await pixiv.illustRanking({date: curDate.toISOString().slice(0,10), mode: 'day'});
  const randomIllustID = illustIds.illusts[Math.floor((Math.random()*100000) % illustIds.illusts.length)]
  const origImageUrl = randomIllustID.meta_single_page.original_image_url;
  const randomIllustImageUrl = origImageUrl || randomIllustID.image_urls.medium;
  // console.log(illustIds.illusts.length);
  return {
    randomIllustImageUrl: randomIllustImageUrl
  };
}

export { RANDOM };