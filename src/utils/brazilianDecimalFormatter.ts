const brazilianDecimalFormatter = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "decimal" });
};

export default brazilianDecimalFormatter
