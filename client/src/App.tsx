import { AuthProvider } from "react-auth-kit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import Login from "./pages/Login";
import VideoDashboard from "./pages/VideoDashboard";

function App() {
  return (
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/video" element={<VideoDashboard />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

export default App;
