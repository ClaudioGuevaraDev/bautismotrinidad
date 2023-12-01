import { useRef, useState } from "react";

import CollageSection from "./components/CollageSection";
import InvitationSection from "./components/InvitationSection";
import VideoSection from "./components/VideoSection";
import { SectionsEnum } from "./enums/sections.enums";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [section, setSection] = useState<SectionsEnum>(SectionsEnum.INVITATION);

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
        {section === SectionsEnum.VIDEO && <VideoSection />}
      </div>
    </section>
  );
}

export default App;
