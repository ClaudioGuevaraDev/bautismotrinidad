import "react-phone-input-2/lib/style.css";

import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";

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
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (!messages || !settings) return;

    const interval = setInterval(() => {
      if (text + 1 === messages.length) {
        // setShowForm(true);
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
          messages?.map((message, index) => (
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
          ))
        )}
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
