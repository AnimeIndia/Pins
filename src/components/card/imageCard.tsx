import Image from 'next/image'

type ImageProps = {
  imageUrl: string;
  title: string;
  author?: string;
  height: number
  width: number
};

// const shimmer = (w: number, h: number) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#333" offset="20%" />
//       <stop stop-color="#222" offset="50%" />
//       <stop stop-color="#333" offset="80%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#333" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="y" from="-${h}" to="${h}" dur="1s" repeatCount="indefinite"  />
// </svg>`

// const toBase64 = (str: string) =>
//   typeof window === 'undefined'
//     ? Buffer.from(str).toString('base64')
//     : window.btoa(str)

const ImageCard = (props: ImageProps) => {

  return (
  <div className="relative cursor-pointer bg-gray-600" style={{height: props.height}} onClick={() => window.open(props.imageUrl, "_blank")}>
    <Image className="rounded bg-blend-overlay hover:opacity-80" 
      src={props.imageUrl} 
      alt="" 
      // layout="responsive"
      // quality="100"
      loading="lazy"
      // unoptimized={true}
      placeholder="empty"
      // blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMy0uuBwAEUQHAm6nZDAAAAABJRU5ErkJggg=='
      // blurDataURL={`${router.basePath}/loading.gif`}
      width={props.width}
      height={props.height} />
    <div className="transform overlay absolute z-10 font-semibold bottom-0 w-full h-14 px-4 bg-black opacity-40 hover:opacity-50">
      <div className="text-white text-lg truncate">{props.title}</div>
      <div className="text-white text-sm truncate">{props.author}</div>
    </div>
  </div>
  );
}

export { ImageCard };
