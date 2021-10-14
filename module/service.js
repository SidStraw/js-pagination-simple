export default function getTdxApi() {
  return fetch('https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Taichung?$format=JSON').then(
    res => res.json()
  )
}
