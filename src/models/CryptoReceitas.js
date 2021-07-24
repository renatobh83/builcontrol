import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const CryptoReceitasSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  id: {
    type: String,
  },
  encryptedData: {
    type: String,
  },
  iv: {
    type: Buffer,
  },
  key: {
    type: Buffer,
  },
  createdAt: {
    type: Date,
    default: Date.now() - 3 * 60 * 60 * 1000,
    select: false,
  },
});

export default mongoose.models.CryptoReceitas ||
  mongoose.model("CryptoReceitas", CryptoReceitasSchema);
