import { Meta } from '../layout/Meta';
import { RankBar } from '../components/rankBar';
import { Main } from '../templates/Main';
import { ImageCard } from '../components/card/imageCard';
import React, { useEffect, useState } from 'react';
import { useInfiniteLoader } from "masonic";
import { useDebounceCallback } from '@react-hook/debounce'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import axios from "axios";
import { RANKING } from '../utils/ranking';
import { DateSwitcher } from '../components/dateSwitcher';
import { supabase } from '../utils/supabaseClient'
import { useWindowSize } from "@react-hook/window-size";
import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  useMasonry,
  usePositioner,
  useScroller,
  useContainerPosition,
  useResizeObserver
} from "masonic";

import { pixivModeState, pixivOffsetState, isInitialRunState, pixivDateState } from "../shared/globalState";
import { useRef } from "react";

// const fetcher = (url: any) => fetch(url).then((res) => res.json())

const OFFSET_CONSTANT = 15;
const OFFSET_START = 0;
const MODE_DEFAULT = 'day'

export const getServerSideProps: GetServerSideProps = async () => {
  // const mode = useRecoilValue(pixivModeState);
  const options = {offset: OFFSET_START, mode: MODE_DEFAULT}

  const curDate = new Date();  
  const date_offset = curDate.toISOString().slice(0,10) + '_' + options.offset;

  let { data } = await supabase
        .from('rank')
        .select()
        .eq('date_offset', date_offset)
        .single();

  if (data && data.imagesData.length > 0) {
      return  { 
        props: {
          data: data
      }
    }
  }

  const rankingData =  await RANKING.call([], options);
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
  const mode = useRecoilValue(pixivModeState);
  const [offsety, setOffsety] = useRecoilState(pixivOffsetState);
  // const [offsetx, setOffsetx] = useState(0);

  const pixivDate = useRecoilValue(pixivDateState);

  const [imagesData, setImagesData] =  useState(data.imagesData);
  const [isInitialRun, setIsInitialRun] =  useRecoilState(isInitialRunState);
  useEffect(() => {
    
    if(isInitialRun) {
      setIsInitialRun(false);
    } else {
      setImagesData([]);
      // setOffsetx(-15);
      setOffsety(-15);
      fetchMoreItems();
    }
      
  }, [mode, pixivDate]);

  const fetchMoreItems = async () => {
    // setOffsetx((offsetx) => (offsetx + OFFSET_CONSTANT));
    setOffsety((offsety) => (offsety + OFFSET_CONSTANT));
    const nextItems =  await axios.get('/api/pixiv/illusts?offset=' + offsety + '&mode=' + mode + "&date=" + pixivDate);

    setImagesData((prevData: any) => {
      if (offsety <= 0)
        return nextItems.data.imagesData;
      var allItems = [...prevData, ...nextItems.data.imagesData];
      const allImageUrls = allItems.map(item => item.imageUrl);
      const uniqueItems = allItems.filter(({imageUrl}, index) => !allImageUrls.includes(imageUrl, index + 1));
      return uniqueItems;
    });

    
  }
  const maybeLoadMore = useInfiniteLoader(fetchMoreItems, {
    isItemLoaded: (index, items) => !!items[index],
    // minimumBatchSize: 15,
    threshold: 15
  })

  const debouncedCallback = useDebounceCallback(maybeLoadMore, 300);


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

const containerRef = useRef(null);
const [windowWidth, windowHeight] = useWindowSize();
const { offset, width } = useContainerPosition(containerRef, [
  windowWidth,
  windowHeight
]);  
const {scrollTop, isScrolling} = useScroller(offset)
const depArray = [mode, pixivDate];
const positioner = usePositioner(
  { width, columnGutter: 20, columnWidth: 250 },
  imagesData.length>0?depArray:[imagesData, offsety]
);
const resizeObserver = useResizeObserver(positioner);

return(
    <Main
      meta={
        <Meta
          title="Ranking"
          description="Pins.Moe"
        />
      }
    >
      <div className="relative bg-no-repeat bg-fixed bg-cover lg:bg-center p-6 min-h-screen">
        
        <RankBar />

        <DateSwitcher />

        <div className="px-60 py-10 w-full">
        {useMasonry({
          positioner,
          scrollTop,
          isScrolling,
          height:windowHeight,
          containerRef,
          items: imagesData,
          overscanBy: 1.25,
          resizeObserver,
          onRender: debouncedCallback,
          render: Card,
        })}
          {/* <Masonry
            // key={imagesData}
            onRender={debouncedCallback}
            items={imagesData?imagesData:[]}
            columnGutter={20}
            columnWidth={250}
            overscanBy={1.25}
            render={Card}
            
          /> */}
        {/* <MasonryScroller
          positioner={positioner}
          // scrollFps={10}
          resizeObserver={resizeObserver}
          containerRef={containerRef}
          items={imagesData?imagesData:[]}
          height={windowHeight}
          // offset={offset}
          overscanBy={1.25}
          render={Card}
          onRender={debouncedCallback}
      /> */}
        <div className="flex items-center flex-wrap justify-around">
          <img src="/tail-spin.svg" alt="" width="50">
            </img>
        </div>
        </div>


      </div>
    </Main>
    
  );

}
