import { format, getHours, getYear } from "date-fns/";
import br from "date-fns/locale/pt-BR";

import { Meses } from "./meses";

function MesCompras(compras: any, anoSelect: any) {
  // const meses = Meses();
  // let mesComCompras: any = [];
  // let ano: string[] = [];
  // compras.data.forEach((compra) => {
  //   console.log(format(new Date(compra.Compras[0].data), "MMMM"), {
  //     locale: br,
  //   });
  //   ano.push(compra._id.ano);
  //   if (Number(compra._id.ano) === Number(anoSelect)) {
  //     let filter = meses.filter((id) => id.key === Number(compra._id.mes));
  //     filter[0].compra = compra;
  //     mesComCompras.push(filter[0]);
  //   }
  // });
  // const anoC = anoCompra(ano);
  // const data = {
  //   mes: mesComCompras.sort(compare),
  //   ano: anoC,
  // };
  // return data;
}

const groupby = (array: any[], key: string) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};

function groupByCompras(array: string | any[], filterAno = "2021") {
  if (array.length === 0) return [];
  if (filterAno) {
    const ano = groupby(array, "ano");
    const mes = groupby(ano[filterAno], "mes");
    return mes;
  }
  return [];
}

function comprasByAno(arrayCompras: any): string[] {
  if (arrayCompras.length === 0) return [];
  const anoTitle = groupby(arrayCompras, "ano");
  const ano = Object.keys(anoTitle);
  return ano.sort(sortArray);
}

function anoCompra(compras: any) {
  const reduceArray = compras.filter((item: any, index: any) => {
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
  if (compras.length === 0) return "";
  const ano = compras.find(
    (ele) => ele === new Date().getFullYear().toString()
  );
  if (ano) {
    return ano;
  }
  return compras[0];
}
export {
  MesCompras,
  converteDate,
  anoCompra,
  findAnoInArray,
  groupByCompras,
  comprasByAno,
};
