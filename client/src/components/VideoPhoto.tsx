interface Props {
  image: string;
}

function VideoPhoto({ image }: Props) {
  return (
    <div className="animate-fade animate-once animate-ease-in">
      <img
        className="object-contain w-auto rounded-[1rem] shadow-2xl"
        src={image}
        alt="Trinidad"
      />
    </div>
  );
}

export default VideoPhoto;
