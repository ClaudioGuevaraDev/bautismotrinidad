import "react-phone-input-2/lib/style.css";

import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

import VideoPhoto from "./VideoPhoto";

const texts: string[] = [
  "Hola Mónica, mi nombre es Trinidad de los Ángeles 👶",
  "Has recibido este mensaje ya que junto a mi familia consideramos que eres una persona importante en mi vida 🥰",
  "Es por esto que me encantaría que me acompañes en mi bautismo el día 6 de enero de 2024 👼",
  "En caso de que quieras asistir, te pido que confirmes tu asistencia al finalizar este video ❤️",
];

function VideoSection() {
  const [text, setText] = useState<number>(0);
  const [image, setImage] = useState<number>(1);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (text + 1 === texts.length) {
        setShowForm(true);
      } else {
        setText(text + 1);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    setTimeout(() => {
      setImage((prevValue) => {
        if (prevValue === 8) {
          return 1;
        } else {
          return prevValue + 1;
        }
      });
    }, 10000);
  }, [image]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[40rem]">
      <div className="text-center lg:text-left xl:shrink-0 h-full flex items-center">
        {showForm ? (
          <form className="animate-fade animate-ease-in animate-duration-[2000ms] p-4 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-4">
              Formulario para confirmar asistencia
            </h1>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre Completo
              </label>
              <input
                type="text"
                id="fullName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ingresa tu nombre completo"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Número de Teléfono
              </label>
              <PhoneInput country="cl" inputProps={{ required: true }} />
            </div>
            <button
              type="submit"
              className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Aceptar Invitación
            </button>
          </form>
        ) : (
          texts.map((t, index) => (
            <>
              {index === text && (
                <span
                  key={t}
                  className="animate-fade animate-ease-in animate-duration-[2000ms] text-5xl font-extrabold leading-none tracking-tight text-white sm:text-6xl"
                >
                  {t}
                </span>
              )}
            </>
          ))
        )}
      </div>
      <div className="max-w-md w-full mx-auto flex h-full items-center justify-center">
        <VideoPhoto image={image} />
      </div>
    </div>
  );
}

export default VideoSection;
