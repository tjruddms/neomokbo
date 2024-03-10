const startdate = document.querySelector("#start-date")
const enddate = document.querySelector("#end-date")

startdate.addEventListener("input", () => {
  drawmark();
})

enddate.addEventListener("input", () => {
  drawmark();
})

var map = new kakao.maps.Map(document.getElementById("map"), {
  center: new kakao.maps.LatLng(sessionStorage.lati, sessionStorage.long),
  level: 6,
});

function drawmark() {
  fetch("/GetDataByClassDate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sclass: ['경적', '사이렌', '개짖는', '비상벨'],
      start: document.querySelector("#start-date").value,
      end: document.querySelector("#end-date").value,
    })
  })
    .then(response => response.json())
    .then(data => {
      const newdata = {
        positions: data.map(item => {
          return {
            lat: item.lat,
            lng: item.lng
          };
        })
      };
      var clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 0,
        minClusterSize: 1,
        disableClickZoom: true,
      });
      clusterer.clear();
      console.log(newdata);
      var markers = newdata.positions.map(position => {
        return new kakao.maps.Marker({
          position: new kakao.maps.LatLng(position.lat, position.lng)
        });
      });

      console.log(markers);
      clusterer.addMarkers(markers);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}
