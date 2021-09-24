import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { NavbarMui } from '../../components/navbarMui';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import axios from 'axios';
import { useContainerPosition, useInfiniteLoader, useMasonry, usePositioner, useResizeObserver, useScroller } from 'masonic';
import { ImageCard } from '../../components/card/imageCard';
import { useDebounceCallback } from '@react-hook/debounce'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useWindowSize } from "@react-hook/window-size";
import { useRecoilValue } from 'recoil';
import { pixivDateState, pixivModeState } from '../../shared/globalState';
import { SEARCH } from '../../utils/search';

const OFFSET_CONSTANT = 15;
const OFFSET_START = 0;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const word = context.query.word;
  const options = {offset: OFFSET_START, word: word}

  const searchData = await SEARCH.call([], options);

  return {
    props: {
      data: searchData
    } // will be passed to the page component as props
  }
}

const Loading = () => (
  <div className="px-40 py-10 w-full">
    <div className="flex items-center flex-wrap justify-around">
      <img src="/tail-spin.svg" alt="" width="50">
        </img>
    </div>
  </div> 
  );


export default function searchPage({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const router = useRouter();
  const word = router.query.word;

  const mode = useRecoilValue(pixivModeState);
  const [offsetx, setOffsetx] = useState(0);
  const pixivDate = useRecoilValue(pixivDateState);
  const [imagesData, setImagesData] =  useState(data.imagesData);
  const [isInitialRun, setIsInitialRun] =  useState(true);

  useEffect(() => {
    if(!isInitialRun) {
      setImagesData([]);
      setOffsetx(0);
      axios.get('/api/pixiv/search?word=' + word + '&offset=' + OFFSET_START).
      then(searchData => {
        setImagesData(searchData.data.imagesData);
      })
    } else {
      setIsInitialRun(false);
    }
  }, [word]);


  // function componentDidUpdate(prevProps: any) {
  //   const { pathname, query } = props.router
  //   // verify props have changed to avoid an infinite loop
  //   if (query.counter !== prevProps.router.query.counter) {
  //     // fetch data based on the new query
  //   }
  // }
  

  const fetchMoreItems = async () => {
    setOffsetx((offsetx) => (offsetx + OFFSET_CONSTANT));
    // setOffsety((offsety) => (offsety + OFFSET_CONSTANT));
    const nextItems =  await axios.get('/api/pixiv/search?word=' + word + '&offset=' + offsetx);

    setImagesData((prevData: any) => {
      if (offsetx <= 0)
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
    threshold: 5
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
  { width, columnGutter: 20, columnWidth: 235 },
  imagesData.length>0?depArray:[imagesData, offsetx]
);
const resizeObserver = useResizeObserver(positioner);

  
  return(
    <Main
      meta={
        <Meta
          title="Search"
          description="Pins.Moe Search Page"
        />
      }
    >
      <div className="relative bg-no-repeat bg-fixed bg-cover lg:bg-center min-h-screen">

        <div className="">
          <NavbarMui />
        </div>

        <div className="px-40 py-10 w-full">
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
        {/* 
        <Masonry
              // key={imagesData}
              onRender={debouncedCallback}
              items={imagesData}
              columnGutter={20}
              columnWidth={250}
              overscanBy={1.25}
              render={Card}
              
            /> */}
          

        <Loading />

      </div>
      </div>

    </Main>
    
  );

}
