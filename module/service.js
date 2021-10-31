export function getBikeApi() {
  return fetch('https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Taichung?$format=JSON').then(
    res => res.json()
  )
}

export function getParkingApi(pageNumber = 1, pageCount) {
  const skip = (pageNumber - 1) * pageCount || 0

  const pageCountParams = `&$top=${pageCount}`
  const skipParams = `&$skip=${skip}`
  return fetch(
    'https://traffic.transportdata.tw/MOTC/v1/Parking/OffStreet/CarPark/City/Taipei?$count=true&$format=JSON' +
      (pageCount ? pageCountParams : '') +
      (skip ? skipParams : '')
  ).then(res => res.json())
}

export default { getBikeApi, getParkingApi }
