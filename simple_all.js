import { renderFunction, createCard, createPaginationItem } from './module/createElements.js'
import createPagination from './module/createPagination.js'
import { getParkingApi } from './module/service.js'

async function main() {
  const PAGE_ITEM_QUANTITY = 10

  const { CarParks } = await getParkingApi()

  const infoElement = document.querySelector('#info')
  const paginationElement = document.querySelector('#pagination')

  const updateInfoCard = renderFunction(infoElement, createCard)
  const updatePagination = renderFunction(paginationElement, createPaginationItem)

  const pagesLength =
    CarParks.length % PAGE_ITEM_QUANTITY === 0
      ? CarParks.length / PAGE_ITEM_QUANTITY
      : Math.trunc(CarParks.length / PAGE_ITEM_QUANTITY) + 1
  const pagination = createPagination({
    pagesLength,
    onChange: updateElements,
  })

  function updateElements({ currentPage, pages }) {
    const currentIndex = (currentPage - 1) * PAGE_ITEM_QUANTITY
    updateInfoCard(CarParks.slice(currentIndex, currentIndex + PAGE_ITEM_QUANTITY))
    updatePagination(pages)
  }

  paginationElement.addEventListener('click', e => {
    const { action, value } = e.target.dataset
    const newPage = Number(value)
    const currentPage = pagination.getCurrentPage()

    if (!action || currentPage === newPage) return

    const { currentPage: newCurrentPage } = pagination[action](newPage)

    history.pushState({ page: newCurrentPage }, '', '?page=' + newCurrentPage)
  })

  window.addEventListener('popstate', ({ state }) => {
    const { page = 1 } = state || {}
    updateElements(pagination.setPage(page))
  })

  const url = new URL(window.location.href)
  const pageParams = url.searchParams.get('page') || 1
  updateElements(pagination.setPage(pageParams))
}

main()
