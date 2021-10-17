import { renderFunction, createCard, createPaginationItem } from './module/createElements.js'
import createPagination from './module/createPagination.js'
import getTdxApi from './module/service.js'

async function main() {
  const PAGE_ITEM_QUANTITY = 10

  const tdxRes = await getTdxApi()

  const infoElement = document.querySelector('#info')
  const paginationElement = document.querySelector('#pagination')

  const updateInfo = renderFunction(infoElement, createCard)
  const updatePagination = renderFunction(paginationElement, createPaginationItem)

  const pagesLength =
    tdxRes.length % PAGE_ITEM_QUANTITY === 0
      ? tdxRes.length / PAGE_ITEM_QUANTITY
      : Math.trunc(tdxRes.length / PAGE_ITEM_QUANTITY) + 1
  const pagination = createPagination({
    pagesLength,
    currentPage: 1,
    onChange: onChangeHeader,
  })

  function updateElements({ currentPage, pages }) {
    const currentIndex = (currentPage - 1) * PAGE_ITEM_QUANTITY
    updateInfo(tdxRes.slice(currentIndex, currentIndex + PAGE_ITEM_QUANTITY))
    updatePagination(pages)
  }

  function onChangeHeader({ currentPage, pages }) {
    updateElements({ currentPage, pages })

    if (currentPage === 1) return history.pushState({ page: 1 }, '', '/')
    history.pushState({ page: pages }, '', '/?page=' + currentPage)
  }

  paginationElement.addEventListener('click', e => {
    const { action, value } = e.target.dataset
    if (!action) return
    pagination[action](value)
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
