const login_email = document.querySelector("#login_email")
const login_pw = document.querySelector("#login_pw")
const btn_login = document.querySelector("#btn_login")
const form_login = document.querySelector("#form_login")

form_login.addEventListener("submit", login)

function login(eve) {
  eve.preventDefault();
  if (!login_email.value) {
    return console.log("아이디를 입력해주세요")
  }
  if (!login_pw.value) {
    return console.log("비밀번호를 입력해주세요")
  }
  const req = {
    email: login_email.value,
    pw: login_pw.value,
  };
  fetch("/changepw", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        if (res.err) return console.log(res.err);
        console.log(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"))
    })
};

