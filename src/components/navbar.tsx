import React, { MouseEvent } from 'react';

// type IMainProps = {
//   meta: ReactNode;
//   children: ReactNode;
// };

// let defaultBgImageUrl = "https://i.loli.best/img-original/img/2021/09/08/00/00/04/92585616_p0.jpg";
// const fetcher = (...args: any) => fetch(...args).then((res) => res.json());

async function randomizeBg(event: MouseEvent, wrapperSetRandomIllustImageUrl: any) {
  event.preventDefault();
  // const randomBgImageData = await RANDOM.call([]);
  
  
  // const imagesData = null;
  // const randomBgImageUrl = randomBgImageData?.randomIllustImageUrl || defaultBgImageUrl;

  // console.log(randomBgImageUrl);
  // if(randomBgImageUrl)
    wrapperSetRandomIllustImageUrl.wrapperSetRandomIllustImageUrl();
  // event.preventDefault();
}

const Navbar = (wrapperSetRandomIllustImageUrl: any) => (
  <div className="navBar">
      <div className="flex items-center flex-wrap justify-start w-full lg:mx-0 mx-auto">
        <a href="/rank" className="transition bg-transparent px-10 py-3 rounded font-normal text-white text-left border-none">Pins</a>
        <a href="#" className="transition bg-transparent px-10 py-3 rounded font-normal text-white text-left border-none">News</a>
        <a href="#" className="transition bg-transparent px-10 py-3 rounded font-normal text-white text-left border-none">Clips</a>

        <a href="/" className="transition flex-1 bg-transparent px-10 py-3 rounded font-normal text-white border-none text-right"
          onClick={(event) => randomizeBg(event, wrapperSetRandomIllustImageUrl)}
        >
          Randomize</a>
        <a href="#" className="transition bg-transparent px-10 py-3 rounded font-normal text-white border-none text-right">Sign-In</a>

      </div>
      </div>
      
      
);

export { Navbar };
