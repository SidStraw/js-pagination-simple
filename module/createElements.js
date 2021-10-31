export function renderFunction(listDom, renderContent, contentData = []) {
  if (contentData.length) listDom.innerHTML = updateElement([...contentData])

  function updateElement(newData) {
    if (newData === contentData) return
    contentData = newData
    listDom.innerHTML = newData.map(renderContent).join('')
  }

  return updateElement
}

export function createCard({ Telephone, CarParkName, Description, Address }) {
  return /*html*/ `
      <article class="flex flex-col shadow m-4 max-w-xs">
          <div class="bg-white flex flex-col justify-start p-6">
              <p class="text-blue-700 text-sm font-bold uppercase pb-4">${Telephone}</p>
              <h2 class="text-3xl font-bold hover:text-gray-700 pb-4">${CarParkName?.Zh_tw}</h2>
              <p class="text-sm pb-3">${Address}</p>
              <p class="uppercase text-gray-800 hover:text-black">${Description}</p>
          </div>
      </article>
    `
}

function clsx(...args) {
  return args.filter(Boolean).join(" ")
}

function propsToAttribute(props) {
  return Object.entries(props)
    .reduce(
      (array, [key, value]) => array.concat(`${key}="${value}"`),
      []
    )
    .join(" ")
}

function Item({ value, className, ...props }) {
  return /*html*/ `
    <a 
      href="?page=${value}"
      onclick="return false"
      class="${clsx(
        "h-10 w-10",
        "font-semibold text-sm",
        "flex items-center justify-center ml-3",
        className
      )}"
      
      ${propsToAttribute(props)}
    >
      ${value}
    </a>
  `
}

export function createPaginationItem({ value, action, isActive }) {
  if (!action) {
    return Item({ value, className: "text-gray-800" })
  }

  if (isActive) {
    return Item({
      value,
      className: "bg-blue-800 hover:bg-blue-600 text-white",
      "data-action": action,
      "data-value": value,
    })
  }

  return Item({
    value,
    className: "text-gray-800 hover:bg-blue-600 hover:text-white",
    "data-action": action,
    "data-value": value,
  })
}

export default { renderFunction, createCard, createPaginationItem }
