import axios from "axios";
import { FormEvent, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

import { Settings } from "../interfaces/settings.interfaces";

function SettingsDashboard() {
  const authHeader = useAuthHeader();
  const { mutate } = useSWRConfig();
  const [delay, setDelay] = useState({
    messages: "",
    images: "",
  });

  const { data: settings } = useSWR<Settings>(
    "/api/settings",
    async (url) => {
      const response = await axios.get(url, {
        headers: {
          Authorization: authHeader(),
        },
      });
      const { messagesDelay, imagesDelay } = response.data.data[0];
      setDelay({ messages: messagesDelay, images: imagesDelay });
      return response.data.data[0];
    },
    { revalidateOnFocus: false }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings) return;

    try {
      const updatedSettings: Settings = {
        ...settings,
        messagesDelay: delay.messages,
        imagesDelay: delay.images,
      };

      mutate(
        "/api/settings",
        await axios.put(
          `/api/settings/${settings?._id}`,
          { messagesDelay: delay.messages, imagesDelay: delay.images },
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        ),
        {
          optimisticData: updatedSettings,
          populateCache: () => updatedSettings,
          revalidate: false,
          rollbackOnError: true,
          throwOnError: true,
        }
      );
      toast.success("Actualizado");
    } catch (error) {
      toast.error("Ocurrió un error");
    }
  };

  return (
    <div className="space-y-4">
      <p>Tiempo en milisegundos</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 max-w-lg"
          placeholder="Delay entre mensajes"
          value={delay.messages}
          onChange={(e) => {
            setDelay({ ...delay, messages: e.target.value });
          }}
        />

        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 max-w-lg"
          placeholder="Delay entre imágenes"
          value={delay.images}
          onChange={(e) => {
            setDelay({ ...delay, images: e.target.value });
          }}
        />

        <button
          type="submit"
          className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none"
        >
          Guardar Configuraciones
        </button>
      </form>
    </div>
  );
}

export default SettingsDashboard;
