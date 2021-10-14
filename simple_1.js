import { renderFunction, createCard, createPaginationItem } from './module/createElements.js'
import createPagination from './module/createPagination.js'
import getTdxApi from './module/service.js'

async function main() {
  const tdxRes = await getTdxApi()
  // console.log(tdxRes)

  const infoElement = document.querySelector('#info')
  const paginationElement = document.querySelector('#pagination')

  const updateInfo = renderFunction(infoElement, createCard)
  const updatePagination = renderFunction(paginationElement, createPaginationItem)

  const pagination = createPagination({
    pagesLength: 15,
    currentPage: 1,
    onChange: onChangeHeader,
  })

  function onChangeHeader() {
    const { currentPage, pages } = pagination.getPages()
    console.log({ currentPage, pages })
    updateInfo(tdxRes.slice(0, 5))
    updatePagination(pages)
  }

  paginationElement.addEventListener('click', e => {
    const { action, value } = e.target.dataset
    if (!action) return
    console.log(e.target, { action, value })
    pagination[action](Number(value))
  })

  updatePagination(pagination.getPages().pages)
}

main()
