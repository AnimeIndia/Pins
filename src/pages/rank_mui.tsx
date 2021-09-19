import Layout from "../layout/Masonry";
import { ImageCard } from '../components/card/imageCard';
// import { useState } from 'react';
// import { Masonry, useInfiniteLoader } from "masonic";
import axios from "axios";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import useSWRInfinite from 'swr/infinite';
import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

// const OFFSET_CONSTANT = 15;
// const OFFSET_START = 0;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const options = {offset: OFFSET_START}
//   const curDate = new Date();  
//   const date_offset = curDate.toISOString().slice(0,10) + '_' + options.offset;

//   let { data } = await supabase
//         .from('rank')
//         .select()
//         .eq('date_offset', date_offset)
//         .single();
  
//   if (data) {
//       return  { 
//         props: {
//           data: data
//       }
//     }
//   }

//   const rankingData =  await RANKING.call([], options);
//     // const illustsApiRes = useSWR('/api/pixiv/illusts?offset=0');

//   data = await supabase
//       .from('rank')
//       .insert([
//           { date_offset: date_offset, imagesData: rankingData.imagesData }
//       ])
//       .single()
//   return {
//     props: {
//       data: rankingData
//     } // will be passed to the page component as props
//   }
// }

// const getKey = (pageIndex: number, previousPageData: any) => {
//   if (previousPageData && !previousPageData.length) return null
//   return `/api/pixiv/illusts?offset=${pageIndex*10}`
// }
export default function rank() {
  // const [offset, setOffset] = useState(0);
  // const [session, setSession] = useState(null);

  // const [imagesData, setImagesData] =  useState(data.imagesData);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView) {
      // Fire a tracking event to your tracking service of choice.
      setSize(size+1);
      console.log(size, "x");

    }
  }, [inView]);


const Card = ({imData}:{imData: any}) => {
    const widthCell = 335;
    const data = imData;
    const heightImg: number = (widthCell/data.width)*data.height;
    // if(index%10 === 0) {
    //     setSize(size+1);
    //     console.log(size, "x");
    //   }
    return (
    <div className="rounded-xl overflow-hidden" key={data.imageUrl}>
      <ImageCard 
          imageUrl={data.imageUrl}
          title={data.title}
          author={data.author} 
          height={heightImg}
          width={widthCell}
        />
    </div>
    );
};

// const getKey = ({pageIndex, previousPageData}:{pageIndex: number, previousPageData: any}) => {
//   if (previousPageData && !previousPageData.length) return null // reached the end
//   return `/api/pixiv/illusts?offset=${pageIndex*15}`                    // SWR key
// }

const { data, size, setSize } = useSWRInfinite<any>(
  index => `/api/pixiv/illusts?offset=${index*15}`,
  fetcher,
);
// console.log(data);
// console.log(error);
// console.log(size);
// console.log(size, "y");

if(!data)
  return <p> Loading</p>

// console.log(data);
let itemData: Array<Object> = [];
for(let i=0; i<data.length; i++) {
  itemData = [...itemData, ...data[i].imagesData];
}
function handleRef(node: HTMLElement | null) {
  inViewRef(node);
}
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
    <div className="px-60 py-20 w-full items-center">
    <ImageList variant="masonry" cols={4} gap={4}>
        {itemData.map((item:any, index: number) => (
          
          <ImageListItem key={index}>
            <div className="rounded-xl overflow-hidden" key={item.imageUrl} ref={index%7 === 0? handleRef : null}> 
                <Card 
                  imData={item}
                />
            </div>
            {/* <ImageListItemBar position="below" title={index} />  */}
          </ImageListItem>
        ))}
      </ImageList>
    
    <div className="flex items-center flex-wrap justify-around">
      <img src="/tail-spin.svg" alt="" width="50">
        </img>
    </div>
          <button className="bg-gray-600 px-4 rounded py-2" onClick={() => {setSize(size+1)}}>
              Load More
          </button>
    </div>

    </Layout>
    
  );

}
