import { Decimal128 } from "mongodb";
import Receita from "./Receita";

const mongoose = require("mongoose");

const ComprasSchema = new mongoose.Schema(
  {
    data: {
      type: Date,
      required: true,
    },
    descr: {
      type: String,
      required: true,
    },
    valor: {
      type: Decimal128,
      required: true,
    },
    recorrente: {
      type: String,
      default: null,
    },
    parcelas: {
      type: String,
    },
    mes: {
      type: String,
    },
    ano: {
      type: String,
    },
    formaPagamento: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      ref: "Users",
    },
    identifier: {
      type: String,
    },
    numParcela: {
      type: String,
      default: null,
    },
    categoria: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now() - 3 * 60 * 60 * 1000,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export default mongoose.models.Compras ||
  mongoose.model("Compras", ComprasSchema);
