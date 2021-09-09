import useSWR from "swr";
import Layout from "../layout/Masonry";

const fetcher = (url: any) => fetch(url).then((res) => res.json())


// function getPixivData() {
//   const imagesData = []
//   const {data, error}= useSWR('/api/pixiv/illusts/', fetcher);

//   if (error) return 'an error occurred'
//   if(!data) return 'loading'
//   imagesData.push(data.imagesData);

//   return imagesData;
// }


export default function rank() {
  const {data, error} = useSWR('/api/pixiv/illusts/', fetcher);
  
  if (error) return 'an error occurred'
  if(!data) return 'loading'
  
  const imagesData = data.imagesData;

  return(
    <Layout>
    <style jsx>{`
      .overlay {
          background: linear-gradient(0deg, black, transparent);
        }
      .masonry {
        column-count: 3;
        column-gap: 1.5rem;
      }
      @screen lg {
        .masonry {
          column-count: 4;
        }
      }
    `}</style>
    <div className="masonry px-40 py-20 w-full">
     
    {imagesData.map((imageData: any ) => (
      <div className="rounded-xl overflow-hidden mb-4" key={imageData.imageUrl}>
        <div className="relative cursor-pointer">
      <img className="rounded" src={imageData.imageUrl} />
      
      <div className="overlay absolute bottom-0 w-full h-24 px-4 pt-6">
        <div className="text-white text-lg">{imageData.title}</div>
        <div className="text-gray-400 text-sm">{imageData.author}</div>
      </div>
    </div>
      </div>
    ))} 
    </div>

    </Layout>
    
  );

}
