import { renderFunction, createCard, createPaginationItem } from './module/createElements.js'
import createPagination from './module/createPagination.js'
import getTdxApi from './module/service.js'

async function main() {
  const PAGE_ITEM_QUANTITY = 10

  const tdxRes = await getTdxApi()
  // console.log(tdxRes)

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

  function onChangeHeader() {
    const { currentPage, pages } = pagination.getPages()
    console.log({ currentPage, pages })
    const currentIndex = (currentPage - 1) * PAGE_ITEM_QUANTITY
    updateInfo(tdxRes.slice(currentIndex, currentIndex + PAGE_ITEM_QUANTITY))
    updatePagination(pages)
  }

  paginationElement.addEventListener('click', e => {
    const { action, value } = e.target.dataset
    if (!action) return
    console.log(e.target, { action, value })
    pagination[action](Number(value))
  })

  onChangeHeader()
}

main()
