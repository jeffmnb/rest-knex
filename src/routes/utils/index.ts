import { ProductData } from "../produtos.types";

export const validateProductValues = (data: ProductData) => {
  if (typeof data !== "object" || !data) return false;

  return (
    typeof data.descricao === "string" &&
    typeof data.marca === "string" &&
    typeof data.preco === "number"
  );
};
