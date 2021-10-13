const PAGE_OPTIONS = {}

export default function createPagination({ pagesLength = 1, currentPage = 1, onChange }) {
  const setPage = n => {
    currentPage = n
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
    const currentRange = Array(10)
      .fill(0)
      .map((val, index) => ({ action: setPage, value: index + currentPage - 5 }))
      .filter(({ value }) => {
        if (currentPage < 1 + 2 && value > currentPage + 2) return false
        if (currentPage < pagesLength - 2 && value < currentPage - 2) return false
        return value > 0 && value <= pagesLength
      })

    const firstOption = currentRange.some(({ value }) => value === 1)
      ? []
      : [
          { action: setPage, value: 1 },
          { action: null, value: '...' },
        ]

    const endOption = currentRange.some(({ value }) => value === pagesLength)
      ? []
      : [
          { action: null, value: '...' },
          { action: setPage, value: pagesLength },
        ]

    const previousPageOption = currentPage === 1 ? [] : [{ action: previousPage, value: 'Prev' }]

    const nextPageOption = currentPage === pagesLength ? [] : [{ action: nextPage, value: 'Next' }]

    return {
      currentPage: currentPage,
      pages: [
        ...previousPageOption,
        ...firstOption,
        ...currentRange,
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
