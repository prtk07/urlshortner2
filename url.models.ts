import { Schema, model } from "mongoose";
const URLSchema = new Schema(require("./url.schema.json"));
const url = model("URL", URLSchema);
export default url;
