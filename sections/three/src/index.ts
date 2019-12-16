type nameSearch = (nameString: string) => number

export const nameSearcher: nameSearch = (nameString) => {
  console.log(`Input: ${JSON.stringify(nameString)}`)
  return 0
}