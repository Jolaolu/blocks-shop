export const convertToLocaleSring = (num: number): string => num.toLocaleString()

export const getNoun = (count: number, word: string): string => {
  return count > 1 ? word + 's' : word
}
