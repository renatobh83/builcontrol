import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const ReceitaSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      required: true,
    },
    valor: {
      type: Decimal128,
      required: true,
    },
    user: {
      type: String,
    },
    mes: {
      type: String,
    },
    ano: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now() - 3 * 60 * 60 * 1000,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.models.Receitas ||
  mongoose.model("Receitas", ReceitaSchema);
