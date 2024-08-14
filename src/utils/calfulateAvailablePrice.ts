export function calculateAvailablePrice(
  originalPrice: number,
  discountPercentage: number
) {
  const discountAmount = (discountPercentage / 100) * originalPrice;
  const availablePrice = originalPrice - discountAmount;
  return availablePrice;
}
