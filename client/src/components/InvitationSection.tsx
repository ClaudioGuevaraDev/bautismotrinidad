import { RefObject } from "react";
import Countdown from "react-countdown";

import { SectionsEnum } from "../enums/sections.enums";

interface CountDownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface Props {
  setSection: (value: SectionsEnum) => void;
  audioRef: RefObject<HTMLAudioElement>;
}

function InvitationSection({ setSection, audioRef }: Props) {
  const renderer = (values: CountDownProps) => {
    const { completed, days, hours, minutes, seconds } = values;
    if (completed) {
      return <span>¡Hoy es el bautismo de Trinidad!</span>;
    } else {
      return (
        <div className="flex gap-5">
          <div>
            <span className="countdown font-mono text-4xl">
              <span>{days}</span>
            </span>
            días
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span>{hours}</span>
            </span>
            horas
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span>{minutes}</span>
            </span>
            minutos
          </div>
          <div>
            <span className="countdown font-mono text-4xl">
              <span>{seconds}</span>
            </span>
            segundos
          </div>
        </div>
      );
    }
  };

  const handleClickInvitation = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setTimeout(() => {
        setSection(SectionsEnum.COLLAGE);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row">
      <div className="text-center md:max-w-2xl lg:text-left xl:shrink-0">
        <div>
          <h2 className="text-3xl font-extrabold leading-none tracking-tight text-white sm:text-5xl">
            Invitación Bautismo Trinidad
          </h2>
          <p className="mt-4 text-base font-normal text-white md:max-w-3xl md:mx-auto sm:text-xl">
            ¡Has sido invitado! Nos complace informarte que has sido invitado al
            bautismo de Trinidad de los Ángeles, que se llevará a cabo el 4 de
            enero de 2024 en San Javier.
          </p>
          <p className="mt-4 text-base font-normal text-white md:max-w-3xl md:mx-auto sm:text-xl">
            Para confirmar tu asistencia, por favor, haz clic en el siguiente
            botón y completa el formulario de asistencia 👇
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 lg:justify-start">
          <button
            className="px-5 py-3 text-lg font-medium text-center text-white bg-fuchsia-700 rounded-lg shrink-0 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300"
            role="button"
            onClick={handleClickInvitation}
          >
            Ver Invitación
          </button>
        </div>
        <div className="flex items-center justify-center gap-5 mt-5 lg:justify-start sm:gap-6">
          <div className="mt-1 text-white space-y-1">
            <span className="text-xl font-light">
              Faltan para el bautismo de trinidad ⏰
            </span>
            <Countdown date={new Date(2024, 0, 6)} renderer={renderer} />
          </div>
        </div>
      </div>
      <div className="max-w-md">
        <img
          className="object-contain w-auto rounded-[1rem] shadow-2xl"
          src="/imgs/foto1.jpg"
          alt="Trinidad"
        />
      </div>
    </div>
  );
}

export default InvitationSection;
