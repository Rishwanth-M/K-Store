const isSameVariant = (item, target) => {
  return (
    item._id === target._id &&
    item.size === target.size
  );
};

export const handleCartDuplicate = (arr, target, operation = "add") => {
  const existingIndex = arr.findIndex((item) =>
    isSameVariant(item, target)
  );

  // 🆕 New product OR new size → push
  if (existingIndex === -1) {
    arr.push({ ...target });
    return arr;
  }

  // 🔁 Same product + same size → update
  arr = arr.map((item, index) => {
    if (index !== existingIndex) return item;

    const singlePrice = item.price / item.quantity;
    const newQuantity =
      operation === "add"
        ? item.quantity + 1
        : item.quantity - 1;

    // Prevent negative quantity
    if (newQuantity <= 0) return item;

    return {
      ...item,
      quantity: newQuantity,
      price:
        operation === "add"
          ? item.price + singlePrice
          : item.price - singlePrice,
    };
  });

  return arr;
};
