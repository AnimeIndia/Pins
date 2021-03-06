import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React, { useState, useCallback } from "react";
// import { Navbar } from '../components/navbar';
import { NavbarMui } from './navbarMui';

const headerLine = 'Welcome to Ani Pins';
let defaultBgImageUrl = "https://pixiv.js.org/-/img-master/img/2021/09/07/14/35/26/92574004_p0_master1200.jpg";


// const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

const Header = ({randomImageUrl} : InferGetServerSidePropsType<GetServerSideProps>) => {
  const [randomIllustImageUrl, setRandomIllustImageUrl] = useState(randomImageUrl || defaultBgImageUrl);
 

  const wrapperSetRandomIllustImageUrl = useCallback(async() => {
    const data =  await axios.get('/api/pixiv/random/');
    const imagesData = await data.data.randomIllustImageUrl;
    setRandomIllustImageUrl(imagesData);
  }, []);

  return (
    <header style = {{backgroundImage: `url(${randomIllustImageUrl})`}} className="relative bg-no-repeat bg-fixed bg-cover lg:bg-center min-h-screen">

      <div className="opacity-50 bg-black">
        <NavbarMui  wrapperSetRandomIllustImageUrl = {wrapperSetRandomIllustImageUrl}/>
        </div>
        <div className="max-w-5xl mx-auto items-center pt-80 lg:py-32 ">
          <h2 className="mx-auto lg:text-5xl max-w-3xl text-4xl text-white text-center items-center">{headerLine}</h2>
        </div>
        
      </header>
  );
}
export { Header };
