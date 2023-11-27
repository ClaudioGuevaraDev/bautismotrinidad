import { connect } from "mongoose";

import { MONGODB_URI } from "./config";

(async () => {
  await connect(MONGODB_URI);
  console.log("Base de datos conectada");
})().catch((error) => {
  console.error(error);
});
