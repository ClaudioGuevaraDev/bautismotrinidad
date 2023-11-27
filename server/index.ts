import "./database";

import app from "./app";

(() => {
  try {
    app.listen(app.get("port"));
    console.log(`Servidor en el puerto ${app.get("port")}`);
  } catch (error) {
    console.error(error);
  }
})();
