export function formatNumber(value: number, decimals: number = 2): string {
  const factor = Math.pow(10, decimals)
  const roundedValue = Math.round(value * factor) / factor
  return roundedValue.toLocaleString('el-GR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
