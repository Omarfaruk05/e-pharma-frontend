export function calculateAvailablePrice(
  originalPrice: number,
  discountPercentage: number
) {
  const discountAmount = Number(
    ((discountPercentage / 100) * originalPrice).toFixed(2)
  );
  const availablePrice = originalPrice - discountAmount;
  return availablePrice;
}
