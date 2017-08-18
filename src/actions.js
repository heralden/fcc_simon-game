export const randomButton = (buttonCount) =>
  Math.floor(Math.random() * buttonCount)

export const boolToBinary = arr => 
  parseInt(arr.map(e => e === true ? 1 : 0).join(''), 2)
