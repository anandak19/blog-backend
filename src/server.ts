import "module-alias/register"
import app from "./app";
import { appConfig } from "./config/app.config";
import connectDB from "./config/db.config";

connectDB();
app.listen(appConfig.PORT, '0.0.0.0')
// app.listen(appConfig.PORT,  () => {
//   console.log(`Server running at port ${appConfig.PORT}`);
// });
