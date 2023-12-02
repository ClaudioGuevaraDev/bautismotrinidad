import axios from "axios";
import { FormEvent, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

import { Message } from "../interfaces/messages.interfaces";

function MessagesDashboard() {
  const authHeader = useAuthHeader();

  const [message, setMessage] = useState<string>("");
  const { mutate } = useSWRConfig();
  const [selectedMessage, setSelectedMessage] = useState<string>("");

  const { data: messages } = useSWR<Message[]>(
    "/api/messages",
    async (url: string) => {
      const response = await axios.get(url);
      const { data } = response.data;
      return data;
    },
    { revalidateOnFocus: false }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (selectedMessage !== "") {
        await axios.put(
          `/api/messages/${selectedMessage}`,
          { text: message },
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
      } else {
        await axios.post(
          "/api/messages",
          { text: message },
          {
            headers: {
              Authorization: authHeader(),
            },
          }
        );
      }

      mutate("/api/messages");
    } catch (error) {
      toast.error("Error al crear el mensaje");
    }

    setMessage("");
  };

  const deleteMessage = async (id: string) => {
    if (!messages) return;

    try {
      const updatedMessages: Message[] = messages?.filter(
        (message) => message._id !== id
      );

      mutate(
        "/api/messages",
        await axios.delete(`/api/messages/${id}`, {
          headers: {
            Authorization: authHeader(),
          },
        }),
        {
          optimisticData: updatedMessages,
          populateCache: () => updatedMessages,
          revalidate: false,
          rollbackOnError: true,
          throwOnError: true,
        }
      );
    } catch (error) {
      toast.error("Error al eliminar el mensaje");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full p-2.5 max-w-lg"
          placeholder="Ingresa un mensaje para el video"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <button
          type="submit"
          className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none"
        >
          Añadir Mensaje
        </button>
      </form>

      <div className="px-4">
        <ul className="list-disc">
          {messages?.map((message) => (
            <li className="space-x-2" key={message._id}>
              {message.text}{" "}
              <button
                className="ml-2"
                onClick={() => {
                  setSelectedMessage(message._id);
                  setMessage(message.text);
                }}
              >
                <FaEdit />
              </button>
              <button onClick={() => deleteMessage(message._id)}>
                <FaRegTrashAlt />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessagesDashboard;
