export function renderFunction(listDom, renderContent, contentData = []) {
  if (contentData.length) listDom.innerHTML = updateElement([...contentData])

  function updateElement(newData) {
    if (newData === contentData) return
    contentData = newData
    listDom.innerHTML = newData.map(renderContent).join('')
  }

  return updateElement
}

export function createCard({ ServiceType, StationName, BikesCapacity, StationAddress, key = 0 }) {
  return /*html*/ `
      <article class="flex flex-col shadow m-4 max-w-xs">
          <img src="https://source.unsplash.com/collection/1346951/400x200?sig=${key}" alt="" />
          <div class="bg-white flex flex-col justify-start p-6">
              <p class="text-blue-700 text-sm font-bold uppercase pb-4">${ServiceType}</p>
              <p class="text-3xl font-bold hover:text-gray-700 pb-4">${StationName?.Zh_tw}</p>
              <p class="uppercase text-gray-800 hover:text-black">站點最大車數： ${BikesCapacity}</p>
              <p class="text-sm pb-3">${StationAddress?.Zh_tw}</p>
          </div>
      </article>
    `
}

export function createPaginationItem({ value, action, isActive }) {
  if (!action) {
    return /*html*/ `
      <button class="h-10 w-10 font-semibold text-gray-800 text-sm flex items-center justify-center ml-3">
        ${value}
      </button>
    `
  }
  if (isActive) {
    return /*html*/ `
      <button
        class="h-10 w-10 bg-blue-800 hover:bg-blue-600 font-semibold text-white text-sm flex items-center justify-center"
        data-action="${action}"
        data-value="${value}"
      >
        ${value}
      </button>
    `
  }

  return /*html*/ `
    <button
      class="h-10 w-10 font-semibold text-gray-800 hover:bg-blue-600 hover:text-white text-sm flex items-center justify-center"
      data-action="${action}"
      data-value="${value}"
    >
      ${value}
    </button>
  `
}

export default { renderFunction, createCard, createPaginationItem }
