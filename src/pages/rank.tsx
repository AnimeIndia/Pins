import Layout from "../layout/Masonry";
import { ImageCard } from '../components/card/imageCard';
import { useState } from 'react';
import { Masonry, useInfiniteLoader } from "masonic";
import { useDebounceCallback } from '@react-hook/debounce'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import axios from "axios";
import { RANKING } from '../utils/ranking';
import { supabase } from '../utils/supabaseClient'

// const fetcher = (url: any) => fetch(url).then((res) => res.json())

export const getServerSideProps: GetServerSideProps = async () => {
  const options = {offset: 0}
  const curDate = new Date();  
  const date_offset = curDate.toISOString().slice(0,10) + '_' + options.offset;

  let { data } = await supabase
        .from('rank')
        .select()
        .eq('date_offset', date_offset)
        .single();
  
  if (data) {
      return  { 
        props: {
          data: data
      }
    }
  }

  const rankingData =  await RANKING.call([], options);
    // const illustsApiRes = useSWR('/api/pixiv/illusts?offset=0');

  data = await supabase
      .from('rank')
      .insert([
          { date_offset: date_offset, imagesData: rankingData.imagesData }
      ])
      .single()
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
  // const [session, setSession] = useState(null);

  const [imagesData, setImagesData] =  useState(data.imagesData);


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
    minimumBatchSize: 15,
    threshold: 15
  })
  const debouncedCallback = useDebounceCallback(maybeLoadMore, 700);

  const Card = ({data:{imageUrl, title, author, width, height}, width: widthCell}
      :{
        data:{
        imageUrl: string, title: string, author: string, width: number, height: number
      },
      width: number
      }
    ) => {
    const heightImg: number = (widthCell/width)*height;

    return (
    <div className="rounded-xl overflow-hidden" key={imageUrl}>
      <ImageCard 
          imageUrl={imageUrl}
          title={title}
          author={author} 
          height={heightImg}
          width={widthCell}
        />
    </div>
    );
};
  

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
        overscanBy={1.25}
        render={Card}
      />
    </div>
    

    </Layout>
    
  );

}
