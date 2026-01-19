export const formatDate = (dateToFormat: string | Date) => {
  const date = new Date(dateToFormat);
  const dateYear = date.getFullYear();
  const dateMonth = String(date.getMonth() + 1).padStart(2, "0");
  const dateDay = String(date.getDate()).padStart(2, "0");
  return `${dateYear}-${dateMonth}-${dateDay}`;
};
