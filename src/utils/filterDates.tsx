import { getHours, getYear } from "date-fns";
import { Meses } from "./meses";

function MesCompras(compras: any, anoSelect: any) {
  const meses = Meses();

  let mesComCompras: any = [];
  let ano: string[] = [];
  compras.data.forEach((compra) => {
    ano.push(compra._id.ano);
    if (Number(compra._id.ano) === Number(anoSelect)) {
      let filter = meses.filter((id) => id.key === Number(compra._id.mes));
      filter[0].compra = compra;
      mesComCompras.push(filter[0]);
    }
  });

  const anoC = anoCompra(ano);
  const data = {
    mes: mesComCompras.sort(compare),
    ano: anoC,
  };
  return data;
}

function anoCompra(compras: any) {
  const reduceArray = compras.filter((item, index) => {
    return compras.indexOf(item) === index;
  });
  return reduceArray.sort(sortArray);
}
function compare(a: any, b: any) {
  if (a.key < b.key) {
    return -1;
  }
  if (a.key > b.key) {
    return 1;
  }
  return 0;
}

function sortArray(a: any, b: any) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
function converteDate(data: any) {
  const parts = data.split("-");
  const dateConverter = new Date(
    `${parts[0]}-${parts[1]}-${parts[2]}T06:00:00.000Z`
  );
  return dateConverter;
}
function findAnoInArray(compras: string[]): string {
  const ano = compras.find(
    (ele) => ele === new Date().getFullYear().toString()
  );
  if (ano) {
    return ano;
  }
  return "";
}
export { MesCompras, converteDate, anoCompra, findAnoInArray };
