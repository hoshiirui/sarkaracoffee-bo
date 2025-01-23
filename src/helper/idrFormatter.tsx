export function formatToIDR(amount: number): string {
  const parts = amount.toString().split(/(?=(?:\d{3})+(?:\.|$))/);
  const formattedAmount = parts.join(".");
  return `Rp. ${formattedAmount}`;
}
