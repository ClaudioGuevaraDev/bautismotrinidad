import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

import { Image } from "../interfaces/images.interfaces";

function ImagesDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const authHeader = useAuthHeader();
  const { mutate } = useSWRConfig();
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: images } = useSWR<Image[]>(
    "/api/images",
    async (url: string) => {
      const response = await axios.get(url);
      const { data } = response.data;
      return data;
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("/api/images", formData, {
        headers: {
          Authorization: authHeader(),
        },
      });
      mutate("/api/images");
      toast.success("Imagen subida");
    } catch (error) {
      toast.error("Error al subir la imagen");
    }

    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const deleteImage = async (imageId: string) => {
    try {
      await axios.delete(`/api/images/${imageId}`, {
        headers: {
          Authorization: authHeader(),
        },
      });
      mutate("/api/images");
      toast.success("Imagen eliminada");
    } catch (error) {
      toast.error("Error al eliminar la imagen");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={fileRef}
          className="block w-full max-w-lg text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          id="file_input"
          type="file"
          onChange={(e) => {
            if (e.target && e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />

        <button
          type="submit"
          className="text-white bg-fuchsia-700 hover:bg-fuchsia-800 focus:ring-4 focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none"
        >
          Subir Imagen
        </button>
      </form>

      <div className="px-4 grid grid-cols-4 gap-4">
        {images?.map((image) => (
          <div key={image._id}>
            <img src={image.url} alt={image._id} />

            <button onClick={() => deleteImage(image._id)}>
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagesDashboard;
