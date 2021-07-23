import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const CryptoComprasSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  iv: {
    type: Buffer,
  },
  key: {
    type: Buffer,
  },
  identifier: {
    type: String,
  },
  encryptedData: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now() - 3 * 60 * 60 * 1000,
    select: false,
  },
});

export default mongoose.models.CryptoCompras ||
  mongoose.model("CryptoCompras", CryptoComprasSchema);
