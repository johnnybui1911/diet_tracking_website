export const getTotalKcal = (list = []) => {
  let total = 0
  list.forEach(item => {
    const { nf_calories, serving_qty, serving_size } = item
    const total_kcal = Math.round((serving_size / serving_qty) * nf_calories)
    total += total_kcal
  })
  return total
}
