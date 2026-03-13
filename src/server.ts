import app from "./app";
import { appConfig } from "./config/app.config";
import connectDB from "./config/db.config";

connectDB();
app.listen(appConfig.port, () => {
  console.log(`Server running at port ${appConfig.port}`);
});
