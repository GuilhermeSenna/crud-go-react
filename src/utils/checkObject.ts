interface IObj {
  [key: string]: any
}

// Check if has any invalid property in object
export const checkIfHasEmptyProperties = (obj: IObj): boolean => {
  return Object.values(obj).some((x) => x === null || x === '')
}
