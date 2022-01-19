"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var URLSchema = new mongoose_1.Schema(require("../url.schema.json"));
var url = (0, mongoose_1.model)("URL", URLSchema);
exports.default = url;
