import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

async function connect() {
    const dbUri = config.get<string>("dbUri");
    try {
        await mongoose.connect(dbUri);
        Logger.info("\nDatabase connected\n");
    } catch (err) {
        Logger.error("Não foi possível conectar!");
        Logger.error(`error: ${err}`);

    }
}

export default connect