import * as yup from "yup";

export const stringRequired = (text) =>
  yup
    .string()
    .required(text || "Поле должно быть заполнено")
    .trim();

export const emailRequired = (text) =>
  yup
    .string()
    .email("Некоректный email")
    .required(text || "Поле должно быть заполнено");
