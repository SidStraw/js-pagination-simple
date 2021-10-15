const PAGE_OPTIONS = {}

export default function createPagination({ pagesLength = 1, currentPage = 1, onChange }) {
  const setPage = n => {
    currentPage = Number(n)
    const pages = getPages()
    typeof onChange === 'function' && onChange(pages)
    return pages
  }

  const setPagesLength = (newPagesLength, newCurrentPage) => {
    pagesLength = newPagesLength
    if (newCurrentPage) currentPage = newCurrentPage
    return getPages()
  }

  const getPages = () => {
    const startNumber = (() => {
      if (currentPage - 2 <= 0) return 1
      const overNumber = currentPage + 2 - pagesLength
      if (overNumber > 0) return currentPage - 2 - overNumber
      return currentPage - 2
    })()

    const currentRange = Array(5)
      .fill(startNumber)
      .map((val, index) => {
        const value = val + index
        return { isActive: value === currentPage, action: 'setPage', value }
      })

    const firstOption = currentRange.some(({ value }) => value === 1)
      ? []
      : [{ action: 'setPage', value: 1 }]

    const endOption = currentRange.some(({ value }) => value === pagesLength)
      ? []
      : [{ action: 'setPage', value: pagesLength }]

    const previousPageOption = currentPage === 1 ? [] : [{ action: 'previousPage', value: 'Prev' }]

    const nextPageOption =
      currentPage === pagesLength ? [] : [{ action: 'nextPage', value: 'Next' }]

    const getMoreOptions = bool => (bool ? [{ action: null, value: '...' }] : [])
    const currentRangeValue = Array.from(currentRange, ({ value }) => value)

    return {
      currentPage: currentPage,
      pages: [
        ...previousPageOption,
        ...firstOption,
        ...getMoreOptions(Math.min(...currentRangeValue) > 1 + 1),
        ...currentRange,
        ...getMoreOptions(Math.max(...currentRangeValue) < pagesLength - 1),
        ...endOption,
        ...nextPageOption,
      ],
    }
  }

  const getCurrentPage = () => currentPage

  const nextPage = () => setPage(currentPage + 1)

  const previousPage = () => setPage(currentPage - 1)

  const firstPage = () => setPage(1)

  const lastPage = () => setPage(pagesLength)

  return {
    setPage,
    setPagesLength,
    getPages,
    getCurrentPage,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
  }
}
