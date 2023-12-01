import { useEffect } from "react";

import { SectionsEnum } from "../enums/sections.enums";

interface Props {
  setSection: (value: SectionsEnum) => void;
}

function CollageSection({ setSection }: Props) {
  useEffect(() => {
    setTimeout(() => {
      setSection(SectionsEnum.VIDEO);
    }, 1000 * 9);
  }, []);

  return (
    <div className="w-full mx-auto animate-fade animate-duration-[5000ms] animate-once animate-ease-in">
      <div className="-m-1 flex flex-wrap md:-m-2">
        <div className="flex w-1/2 flex-wrap">
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt=""
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/imgs/foto7.jpg"
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt=""
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/imgs/foto5.jpg"
            />
          </div>
          <div className="w-full p-1 md:p-2">
            <img
              alt=""
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/imgs/foto1.jpg"
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-wrap">
          <div className="w-full p-1 md:p-2">
            <img
              alt=""
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/imgs/foto2.jpg"
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt=""
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/imgs/foto3.jpg"
            />
          </div>
          <div className="w-1/2 p-1 md:p-2">
            <img
              alt=""
              className="block h-full w-full rounded-lg object-cover object-center"
              src="/imgs/foto4.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollageSection;
