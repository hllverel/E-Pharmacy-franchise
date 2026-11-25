export const formatMoney = (value) =>
  Number(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const formatSignedAmount = (value) =>
  `${value > 0 ? '+' : ''}${formatMoney(value)}`;