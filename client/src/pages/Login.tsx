import axios from "axios";
import { FormEvent, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [credentials, setCredentials] = useState({ user: "", password: "" });
  const navigate = useNavigate();

  const signIn = useSignIn();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", credentials);
      const { data: token } = response.data;

      const decodedToken = decodeToken(token) as {
        user: string;
        iat: number;
        exp: number;
      };

      signIn({
        token: token,
        expiresIn: decodedToken["exp"],
        tokenType: "Bearer",
        authState: { user: decodedToken.user },
      });
      navigate("/dashboard/video");
    } catch (error) {
      toast.error("Error al iniciar sesión");
    }
  };

  return (
    <section className="from-pink-500 to-pink-300 bg-gradient-to-tr antialiased min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="user"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Usuario
                </label>
                <input
                  type="text"
                  id="user"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-fuchsia-600 focus:border-fuchsia-600 block w-full p-2.5"
                  autoFocus={true}
                  value={credentials.user}
                  onChange={(e) => {
                    setCredentials({ ...credentials, user: e.target.value });
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-fuchsia-600 focus:border-fuchsia-600 block w-full p-2.5"
                  value={credentials.password}
                  onChange={(e) => {
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
