import Layout from "../layout/Masonry";
import { ImageCard } from '../components/imageCard';
import { useState } from 'react';
import { Masonry, useInfiniteLoader } from "masonic";
import { useDebounceCallback } from '@react-hook/debounce'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import axios from "axios";
import { RANKING } from '../utils/ranking';

// const fetcher = (url: any) => fetch(url).then((res) => res.json())

export const getServerSideProps: GetServerSideProps = async () => {
  const options = {offset: 0}
  const rankingData =  await RANKING.call([], options);
    // const illustsApiRes = useSWR('/api/pixiv/illusts?offset=0');
  return {
    props: {
      data: rankingData
    } // will be passed to the page component as props
  }
}

// const getKey = (pageIndex: number, previousPageData: any) => {
//   if (previousPageData && !previousPageData.length) return null
//   return `/api/pixiv/illusts?offset=${pageIndex*10}`
// }
export default function rank({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [offset, setOffset] = useState(0);
  // const {data, error} = useSWR('/api/pixiv/illusts?offset=' + offset, fetcher);
 

  // const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
  //   index => `/api/pixiv/illusts?offset=10`,
  //   fetcher
  // // );
  
  // if (error) return 'an error occurred'
  // if(!data) return 'loadingx'
  const [imagesData, setImagesData] =  useState(data.imagesData);
  // const imagesData = data ? [].concat(...data) : [];
  // const imageArrayMap = Array.from(data, x => Array.from(x.imagesData, y => y));
  // const imagesData = [].concat(...imageArrayMap);
  // // const imagesDataConcat = imagesData ? Array.from(data, ([name, value]) => ({ name, value })) : [];
  // console.log(imagesData);

  const fetchMoreItems = async () => {
    setOffset(offset + 15);
    const nextItems =  await axios.get('/api/pixiv/illusts?offset=' + offset);
    const allItems = [...imagesData, ...nextItems.data.imagesData];
    const allImageUrls = allItems.map(item => item.imageUrl);
    const uniqueItems = allItems.filter(({imageUrl}, index) => !allImageUrls.includes(imageUrl, index + 1));
    // const uniqueItemsData = Array.from(new Set(nextItems.data.imagesData));
    // const allUniqueItemsData = Array.from(new Set([...imagesData, ...uniqueItemsData]));
    setImagesData(uniqueItems);
    console.log(uniqueItems.length);
    
  }
  const maybeLoadMore = useInfiniteLoader(fetchMoreItems, {
    isItemLoaded: (index, items) => !!items[index],
    threshold: 18
  })
  const debouncedCallback = useDebounceCallback(maybeLoadMore, 300)


  const Card = ( {data}: any ) => (
    
    <div className="rounded-xl overflow-hidden mb-4" key={data.imageUrl}>
      <ImageCard 
          imageUrl={data.imageUrl}
          title={data.title}
          author={data.author}
        />
    </div>
  );
  

  return(
    <Layout>
    <style jsx>{`
      .overlay {
          background: linear-gradient(0deg, black, transparent);
        }
      @screen lg {
        .masonry {
          column-count: 4;
        }
      }
      
    `}</style>
    <div className="px-60 py-20 w-full">
      <Masonry
        onRender={debouncedCallback}
        items={imagesData}
        columnGutter={20}
        columnWidth={250}
        overscanBy={1}
        render={Card}
      />
    </div>
    

    </Layout>
    
  );

}
