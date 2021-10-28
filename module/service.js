export function getBikeApi() {
  return fetch('https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Taichung?$format=JSON').then(
    res => res.json()
  )
}

export function getParkingApi(pageNumber, pageCount) {
  const skip = (pageNumber - 1) * pageCount
  return fetch(
    `https://traffic.transportdata.tw/MOTC/v1/Parking/OffStreet/CarPark/City/Taipei?$top=${pageCount}&$skip=${skip}&$count=true&$format=JSON`
  ).then(res => res.json())
}

export default { getBikeApi, getParkingApi }
