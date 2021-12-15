# 如何使用 JavaScript 製作分頁效果

----

![](https://i.imgur.com/eFF1sqH.png)

---

## 關於我

----

先後於台中 Microprogram 微程式資訊與 Newegg 擔任前端工程師，負責使用前端技術開發與維護 Web 與 React Native App 相關服務。

----

平時以「Sid」、「管管」等暱稱積極參與前端社群活動。

----

主要出沒地：

- [兔兔教 × Tailwind CSS Taiwan](https://www.facebook.com/groups/tailwindcss.taiwan/)
- [台灣網頁前端技術交流社群](https://line.me/ti/g2/-c2_dc22pM0mfg6Le6ciPvsikKa3eXRn_YXatQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default)
- 台中「[Monospace 共同工作空間](https://www.facebook.com/monospace.tw/)」實體社群
- 個人部落格 [這可要好好管管 Sid.tw](https://sid.tw/)

---

## 綱要

- 設計思路
- 知識點補充
- DOM render 處理
- Pagination 處理
- history API
- 延伸討論
- 問題與討論

----

## 頁面 Demo

- [js-pagination-simple Repo](https://github.com/SidStraw/js-pagination-simple)
- [Demo Page](https://sidstraw.github.io/js-pagination-simple/)

----

後續討論
![](https://i.imgur.com/9V9LOen.png)

---

## 設計思路

為什麼要需要分頁？

----

要達成分頁效果的常見做法：

- 一次性取得所有資料
- 批次獲取各頁面資料

----

### 分頁獲取的前提

- API 有回傳資料總筆數

----

### API 資料取得

#### OffStreetParkingCityAPI : 各縣市[路外]停車場資料

GET /v1/Parking/OffStreet/CarPark/City/{City}

> 取得指定[縣市]之停車場基本資料

https://tdx.transportdata.tw/api-service/swagger

----

### 狀態管理與頁面渲染

---

## 知識點補充

- Event Bubbling
- Dataset
- ES module
- 解構賦值
- 展開運算子
- 閉包 Closure

----

### Event Bubbling

```jsx=
paginationElement.addEventListener('click', e => {
  const target = e.target.dataset
  const currentTarget= e.currentTarget.dataset
})
```

----

> e.target
![](https://i.imgur.com/nwtdzXN.png)

----

> e.currentTarget
![](https://i.imgur.com/bDBgkYm.png)


----

### Dataset

```htmlmixed=
<a
  href="?page=1"
  onclick="return false"
  data-action="setPage"
  data-value="1"
>
  1
</a>
```

```jsx=
paginationElement.addEventListener('click', e => {
  const { action, value } = e.target.dataset
  action === 'setPage' // true
  value === '1' // true
})
```

----

### ES module

```htmlmixed=
<script type="module" src="./simple_all.js"></script>
```
```jsx=
// simple_all.js
import { getParkingApi } from './module/service.js'
```
```jsx=
// module/service.js
export function getBikeApi() {}
export function getParkingApi() {}
export default { getBikeApi, getParkingApi }
```

----

### 解構賦值

```jsx=
function foo({ a = 1, b = 1, c }) {}
```

```jsx=
foo({
  a: 10,
  c: () => {},
})
```

----

剛剛 Dataset 講到的範例

```jsx=
paginationElement.addEventListener('click', e => {
  const { action, value } = e.target.dataset
  action === 'setPage' // true
  value === '1' // true
})
```

----

### 展開運算子

```jsx=
Math.max(1, 2, 3) === Math.max([1, 2, 3]) //false
Math.max(1, 2, 3) === Math.max(...[1, 2, 3]) //true
```

```jsx=
const arr1 = [1, 2, 3]
const arr2 = arr1
arr1 === arr2 // true

const arr1 = [1, 2, 3]
const arr2 = [...arr1]
arr1 === arr2 // false
```

----

### 閉包 Closure

```jsx=
function foo(data) {
    const getData = () => data
    const setData = n => data = n
    return {getData, setData}
}

const { getData, setData } = foo(10)

getData() //10
setData(50)
getData() //50
```

---

## DOM render 處理

- 建立渲染函式
- 建立共用組件

----

建立渲染函式

```jsx=
export function renderFunction(bindDom, renderContent, contentData = []) {
  if (contentData.length) bindDom.innerHTML = updateElement([...contentData])

  function updateElement(newData) {
    contentData = newData
    bindDom.innerHTML = newData.map(renderContent).join('')
  }

  return updateElement
}
```

----

產生頁面結構的函式

```jsx=
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
```


----

### 宣告式與命令式的程式設計

明明是簡單的 innerHTML，為什麼要多此一舉？


---

## Pagination 處理

- 建立 create 函式儲存 Pagination 需要的狀態
- create 函式回傳操作 Pagination 需要的方法

----

```jsx=
export default function createPagination({ pagesLength = 1, currentPage = 1, onChange }) {
  const setPage = n => {...}

  const setPagesLength = (newPagesLength, newCurrentPage) => {}

  const getPages = () => {...}

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

```

---

## history API

讓換頁功能不只是虛有其表

----

### history.pushState

```
history.pushState(state, title [, url])
```


```jsx=
history.pushState({ page: 10 }, '', '?page=' + 10)
```

----

### 監聽使用者「上一頁」、「下一頁」

```jsx=
window.addEventListener('popstate', ({ state }) => {
  const { page = 1 } = state || {}
  updateElements(pagination.setPage(page))
})
```

---

## 延伸討論

----

- 資料暫存
- 資料更新
- 每頁筆數
- 搜尋篩選

----

### Pagination-UI-LESS 套件

- Repo： [Pagination-UI-LESS](https://github.com/SidStraw/Pagination-UI-LESS)
- CDN： [https://cdn.jsdelivr.net/npm/pagination-ui-less](https://cdn.jsdelivr.net/npm/pagination-ui-less)

----

### npm install

```bash
npm i pagination-ui-less
or
yarn add pagination-ui-less
```

----

### 使用 CDN

```htmlmixed=
<script src="https://cdn.jsdelivr.net/npm/pagination-ui-less"></script>
```

```jsx=
paginationUiLess({
    pagesLength: 1,
    currentPage: 1,
    onChange: () => {}
})
```

---

## Q&A

---

## 謝謝大家
