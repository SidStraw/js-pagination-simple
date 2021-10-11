const PAGE_OPTIONS = {}

export default function createPagination(pagesLength = 1, currentPage = 1) {
  const setPage = n => {
    currentPage = n
    return getPages()
  }

  const getPages = () => {
    const currentRange = Array(10)
      .fill(0)
      .map((val, index) => ({ action: setPage, value: index + currentPage - 5 }))
      .filter(({ value }) => value > 0 && value <= pagesLength)

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

    return [
      { action: currentPage === 1 ? null : previousPage, value: 'Prev' },
      ...firstOption,
      ...currentRange,
      ...endOption,
      { action: currentPage === pagesLength ? null : nextPage, value: 'Next' },
    ]
  }

  const getCurrentPage = () => currentPage

  const nextPage = () => setPage(currentPage + 1)

  const previousPage = () => setPage(currentPage - 1)

  const firstPage = () => setPage(1)

  const lastPage = () => setPage(pagesLength)

  return { setPage, getPages, getCurrentPage, nextPage, previousPage, firstPage, lastPage }
}
