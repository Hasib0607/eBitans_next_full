export const prodMultiCat = (category: any) => {
  return category
    ?.map(
      (cat: any, index: number) =>
        `${cat.name}${index < category.length - 1 ? ", " : ""}`
    )
    ?.join("");
};
