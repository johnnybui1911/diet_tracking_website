export const getTotalKcal = (list = []) => {
  let total = 0
  list.forEach(item => {
    const { nf_calories, serving_qty, serving_size } = item
    const total_kcal = Math.floor(nf_calories * serving_qty * serving_size)
    total += total_kcal
  })
  return total
}
