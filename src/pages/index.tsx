import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { Header } from '../components/header';
import RANDOM from '../utils/random';
// import useSWR from 'swr';


// const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

// async function getPixivData() {
//   const imagesData = []
//   const {data, error} = await axios.get('/api/pixiv/random').then(res => res.data);

//   if (error) return 'an error occurred'
//   if(!data) return 'loading'
//   imagesData.push(data.imagesData);

//   return imagesData;
// }

export const getServerSideProps: GetServerSideProps = async () => {
  const randomBgImageData = await RANDOM.RANDOM.call([]);
  return {
    props: {
      randomBgImageData: randomBgImageData
    } // will be passed to the page component as props
  }
}

const Index = ({randomBgImageData}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const router = useRouter();

  const bgImageUrl: string = randomBgImageData.randomIllustImageUrl;

  return (
    
    <Main
      meta={
        <Meta
          title="Pins.Moe"
          description="Pins.Moe"
        />
      }
    >

      <Header randomImageUrl={bgImageUrl} />
      
    </Main>
  );
};

export default Index;
