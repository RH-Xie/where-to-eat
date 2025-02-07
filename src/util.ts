export const getRandom = <T>(arrayLike: T[]): T => {
  return arrayLike[Math.floor(Math.random() * arrayLike.length)]
}
