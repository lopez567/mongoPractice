//get geolocation
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(
    function(position) {
      var loc = ({lat: position.coords.latitude.toFixed(6),lon: position.coords.longitude.toFixed(6)})
      return loc
    },
    function(error) {
      console.log("something went wrong with your stuff")
      return coord
    },
    { timeout: 10000 }
)
} else {
  console.log("YOUR BROWSER SUCKS")
  return coord  // device doesn't support geolocation
}
