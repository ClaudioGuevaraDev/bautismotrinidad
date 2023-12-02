import axios from "axios";
import { useRef, useState } from "react";
import useSWR from "swr";

import CollageSection from "../components/CollageSection";
import InvitationSection from "../components/InvitationSection";
import VideoSection from "../components/VideoSection";
import { SectionsEnum } from "../enums/sections.enums";
import { Image } from "../interfaces/images.interfaces";
import { Message } from "../interfaces/messages.interfaces";
import { Settings } from "../interfaces/settings.interfaces";

function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [section, setSection] = useState<SectionsEnum>(SectionsEnum.INVITATION);

  const { data: messages } = useSWR<Message[]>(
    "/api/messages",
    async (url: string) => {
      const response = await axios.get(url);
      const { data } = response.data;
      return data;
    }
  );

  const { data: images } = useSWR<Image[]>(
    "/api/images",
    async (url: string) => {
      const response = await axios.get(url);
      const { data } = response.data;
      return data;
    }
  );

  const { data: settings } = useSWR<Settings>(
    "/api/settings",
    async (url: string) => {
      const response = await axios.get(url);
      const { data } = response.data;
      return data[0];
    }
  );

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <section className="from-pink-500 to-pink-300 bg-gradient-to-tr antialiased min-h-screen h-full flex items-center">
      <audio
        ref={audioRef}
        src="/audios/cancion2.mp3"
        controls
        className="hidden"
        onEnded={resetAudio}
      />
      <div className="w-full max-w-screen-xl px-4 py-8 mx-auto lg:px-6">
        {section === SectionsEnum.INVITATION && (
          <InvitationSection setSection={setSection} audioRef={audioRef} />
        )}
        {section === SectionsEnum.COLLAGE && (
          <CollageSection setSection={setSection} />
        )}
        {section === SectionsEnum.VIDEO && (
          <VideoSection
            images={images}
            messages={messages}
            settings={settings}
          />
        )}
      </div>
    </section>
  );
}

export default Home;
