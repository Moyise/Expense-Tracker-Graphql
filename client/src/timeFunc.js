export const timeFunc = (expense) => {
  // -- Time formatting -- //
  const d = new Date(expense.updatedAt);
  const date = d.toISOString().split("T")[0];
  const time = d.toTimeString().split(" ")[0].substring(0, 5);

  return `${date} at ${time}`;
};
