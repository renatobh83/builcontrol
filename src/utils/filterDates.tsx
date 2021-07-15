import { getMonth, addHours, getHours, getMinutes } from "date-fns";

function MesCompras(compras) {
  let obj = {};
  compras.forEach((compra) => {
    console.log(compra);
    const m = getMonth(new Date(compra.data));
    obj[m] = compra;
  });
}

function converteDate(data) {
  const parts = data.split("-");
  const agora = Date.now();
  const dateConverter = new Date(
    `${parts[0]}-${parts[1]}-${parts[2]}T${getHours(agora)}:00:00.000Z`
  );
  return dateConverter;
}

export { MesCompras, converteDate };
