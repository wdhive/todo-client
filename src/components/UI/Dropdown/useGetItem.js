const getItem = (list, selectedValue) => {
  return (pos = 0) => {
    let index = list.findIndex((item) => item.value === selectedValue)

    switch (pos) {
      case 0:
        return list[index]

      case 1:
        index++
        break

      case -1:
        index--
        break

      default:
        throw new Error('Invalid position')
    }

    if (index > list.length - 1) return list[0]
    if (index < 0) return list[list.length - 1]
    return list[index]
  }
}

export default getItem
