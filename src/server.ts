import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    app.listen(config.PORT, () => {
      console.log(
        `Mission To JP - Assignment-01. App listening on port ${config.PORT}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

main();
