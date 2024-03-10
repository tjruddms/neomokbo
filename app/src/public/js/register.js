const register_email = document.querySelector("#register_email")
const resgister_pw = document.querySelector("#resgister_pw")
const confirm_pw = document.querySelector("#confirm_pw")
const btn_register = document.querySelector("#register_btn")

console.log(register_email);
console.log("hello");

// btn_register.addEventListener("click", Register)

function Register() {
  if (!register_email.value) {
    return console.log("이메일을 입력해주세요")
  }
  if (resgister_pw.value !== confirm_pw.value) {
    return console.log("비밀번호 불일치")
  }

  const req = {
    email: register_email.value,
    pw: resgister_pw.value,
    confirm_pw: confirm_pw.value,
  };

  fetch("/register", {
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
      console.error(new Error("회원가입 중 에러 발생"))
    })
};

