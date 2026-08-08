export function formatPrice(value) {
  return `£${Number(value ?? 0).toFixed(2)}`;
}

export function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}
