export function getStatusFromTime(createdAt: Date) {
  const diff = (Date.now() - new Date(createdAt).getTime()) / 1000;

  if (diff < 6) return "Order Received";
  if (diff < 12) return "Preparing";
  if (diff < 18) return "Out for Delivery";
  return "Delivered";
}
