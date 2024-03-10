function handleButtonClick(buttonNumber) {
  alert('Button ' + buttonNumber + ' clicked!');
}
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
navigator.geolocation.getCurrentPosition((coord, err, options) => {
  sessionStorage.setItem("lati", coord.coords.latitude)
  sessionStorage.setItem("long", coord.coords.longitude)
  console.log(sessionStorage.lati, sessionStorage.long);
})

$(document).ready(function () {
  $('.btn.buy').hide();
  $('.item').click(function () {
    $(this).find('.btn.buy').toggle();
    $(this).find('.item-overlay').toggleClass('clicked');
  });
});
