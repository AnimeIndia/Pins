
type ImageProps = {
  imageUrl: string;
  title: string;
  author?: string;
};
const ImageCard = (props: ImageProps) => (
  <div className="relative cursor-pointer">
    <img className="rounded" src={props.imageUrl} />
    <div className="overlay absolute bottom-0 w-full h-24 px-4 pt-6">
      <div className="text-white text-lg">{props.title}</div>
      <div className="text-gray-400 text-sm">{props.author}</div>
    </div>
  </div>
);

export { ImageCard };
