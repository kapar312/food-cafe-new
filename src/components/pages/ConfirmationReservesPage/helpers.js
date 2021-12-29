import moment from "moment";
moment.locale("ky");

function formatLastDigits(digits) {
  return digits ? `${digits.substring(0, 2)} ${digits.substring(2, digits.length)}` : "";
}

function formatPrice(price) {
  let parts = price.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".") + " ₽";
}

export {formatLastDigits, formatPrice};
