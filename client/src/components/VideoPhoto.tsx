interface Props {
  image: number;
}

function VideoPhoto({ image }: Props) {
  return (
    <div className="animate-fade animate-once animate-ease-in">
      <img
        className="object-contain w-auto rounded-[1rem] shadow-2xl"
        src={`/imgs/foto${image}.jpg`}
        alt="Trinidad"
      />
    </div>
  );
}

export default VideoPhoto;
