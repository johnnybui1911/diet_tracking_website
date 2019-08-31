import deburr from 'lodash/deburr'
export function getSuggestions(results, value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0
  const suggestions = results
  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const { nix_item_id } = suggestion
        let keep = false
        if (nix_item_id) {
          keep = count < 5
        } else {
          keep = count < 5
        }
        if (keep) {
          count += 1
        }
        return keep
      })
}
