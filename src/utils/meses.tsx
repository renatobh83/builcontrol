export const Meses = (keyValue) => {
  const meses = [
    { key: 0, value: "Janeiro" },
    { key: 1, value: "Fevereiro" },
    { key: 2, value: "Marco" },
    { key: 3, value: "Abril" },
    { key: 4, value: "Maio" },
    { key: 5, value: "Junho" },
    { key: 6, value: "Julho" },
    { key: 7, value: "Agosto" },
    { key: 8, value: "Setembro" },
    { key: 9, value: "Outubro" },
    { key: 10, value: "Novembro" },
    { key: 11, value: "Dezembro" },
  ];
  return meses[keyValue].value;
};
