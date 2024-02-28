import { useEffect, useState } from "react";

import { Image } from "../interfaces/images.interfaces";
import { Message } from "../interfaces/messages.interfaces";
import { Settings } from "../interfaces/settings.interfaces";
import VideoPhoto from "./VideoPhoto";

interface Props {
  messages?: Message[] | null;
  images?: Image[] | null;
  settings?: Settings | null;
}

function VideoSection({ images, messages, settings }: Props) {
  const [text, setText] = useState<number>(0);
  const [image, setImage] = useState<number>(0);

  useEffect(() => {
    if (!messages || !settings) return;

    const interval = setInterval(() => {
      if (text + 1 === messages.length) {
        
      } else {
        setText(text + 1);
      }
    }, parseInt(settings.messagesDelay));

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    if (!settings || !images) return;

    setTimeout(
      () => {
        setImage((prevValue) => {
          if (prevValue === images?.length - 1) {
            return 0;
          } else {
            return prevValue + 1;
          }
        });
      },
      parseInt(settings?.imagesDelay)
    );
  }, [image]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[40rem]">
      <div className="text-center lg:text-left xl:shrink-0 h-full flex items-center">
        {messages?.map((message, index) => (
            <>
              {index === text && (
                <span
                  key={message._id}
                  className="animate-fade animate-ease-in animate-duration-[2000ms] text-2xl font-extrabold leading-none tracking-tight text-white sm:text-4xl"
                >
                  {message.text}
                </span>
              )}
            </>
          ))}
      </div>
      {images && (
        <div className="max-w-md w-full mx-auto flex h-full items-center justify-center">
          <VideoPhoto image={images[image].url} />
        </div>
      )}
    </div>
  );
}

export default VideoSection;
