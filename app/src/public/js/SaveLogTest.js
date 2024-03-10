var req = {
  email: sessionStorage.email,
  sclass: now_sound,
  lat: sessionStorage.lat,
  lng: sessionStorage.lng,
}

var DoSaveLog = () => {
  fetch('/SaveLog', {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        console.log("save log success");
      } else {
        if (res.err) return console.log(res.err);
        console.log(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"));
    });
}

DoSaveLog()