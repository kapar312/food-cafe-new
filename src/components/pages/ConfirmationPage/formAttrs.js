import * as yup from "yup";

export const initialValues = {
  digitsOfNumber: "",
};

export const formSchema = yup.object().shape({
  digitsOfNumber: yup.string().required("").trim(),
});
