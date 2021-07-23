const groupby = (array: any[], key: string) => {
  if (array) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  } else {
    return {};
  }
};

function groupByCompras(array: string | any[], filterAno = "2021") {
  if (array.length === 0) return [];
  if (filterAno) {
    const ano = groupby(array, "ano");
    const mes = groupby(ano[filterAno], "mes");
    return mes;
  }
  return {};
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
  converteDate,
  anoCompra,
  findAnoInArray,
  groupByCompras,
  comprasByAno,
  groupby,
};
