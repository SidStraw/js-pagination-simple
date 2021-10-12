export default function createCard({
  ServiceType,
  StationName,
  BikesCapacity,
  StationAddress,
  key = 0,
}) {
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
