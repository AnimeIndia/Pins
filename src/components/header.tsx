import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Navbar } from '../components/navbar';

const headerLine = "See Arts, Read Anime News and much more."
let defaultBgImageUrl = "https://pixiv.js.org/-/img-master/img/2021/09/07/14/35/26/92574004_p0_master1200.jpg";

// export const getServerSideProps: GetServerSideProps = async () => {
//   // const bgImageData = await fetch('/api/pixiv/random').then((res) => res.json());
//   // console.log(bgImageData);
//   return {
//     props: {
//       bgImageData: null
//     } // will be passed to the page component as props
//   }
// }

const Header = ({randomImageUrl} : InferGetServerSidePropsType<GetServerSideProps>) => {
  const bgImageUrl = randomImageUrl || defaultBgImageUrl;

  console.log(bgImageUrl);
  return (
    <header style = {{backgroundImage: `url(${bgImageUrl})`}} className="relative bg-no-repeat bg-fixed bg-cover lg:bg-center p-6 min-h-screen">

        <Navbar/>
        
        <div className="max-w-5xl mx-auto items-center pt-80 lg:py-32 ">
          <h2 className="mx-auto lg:text-5xl max-w-3xl text-4xl text-white text-center items-center">{headerLine}</h2>
        </div>
        
      </header>
  );
}
export { Header };
