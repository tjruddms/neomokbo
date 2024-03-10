const login_email = document.querySelector("#login_email");
const login_pw = document.querySelector("#login_pw");
const btn_login = document.querySelector("#btn_login");
const form_login = document.querySelector("#form_login");

const register_email = document.querySelector("#register_email");
const resgister_pw = document.querySelector("#resgister_pw");
const confirm_pw = document.querySelector("#confirm_pw");
const btn_register = document.querySelector("#register_btn");

function myFunction() {
  var x = document.getElementById("login_pw");
  var y = document.getElementById("hide1");
  var z = document.getElementById("hide2");

  if (x.type === "password") {
    x.type = "text";
    y.style.display = "block";
    z.style.display = "none";
  } else {
    x.type = "password";
    y.style.display = "none";
    z.style.display = "block";
  }
}
sessionStorage.setItem("lati", undefined)
sessionStorage.setItem('long', undefined)

const signInBtnLink = document.querySelector(".signup-btn");
const signUpBtnLink = document.querySelector(".register-link");
const logInLink = document.querySelector(".login-link");

const wrapper = document.querySelector(".wrapper");

signUpBtnLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});

logInLink.addEventListener("click", () => {
  wrapper.classList.toggle("active");
});

document.querySelector("#register_form").addEventListener("submit", () => {
  var password = document.querySelector(".password").value;
  var confirmPassword = document.querySelector(".confirmPassword").value;

  if (password === confirmPassword) {
    wrapper.classList.toggle("active");
    Register();
  } else {
    alert("비밀번호가 일치하지 않습니다.");
  }
});

function enableRegisterButton() {
  var registerBtn = document.getElementById("register_btn");
  var termsCheckbox = document.getElementById("termsCheckbox");

  registerBtn.disabled = !termsCheckbox.checked;
}

document.getElementById("openModal").addEventListener("click", function () {
  document.getElementById("myModal").style.display = "block";

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var textContent = xhr.responseText;
      document.getElementById("textFileContent").innerText = textContent;
    }
  };
  xhr.open("GET", "../PrivacyPolicy.txt", true);
  xhr.send();
});

// 모달 닫기
document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
  });

form_login.addEventListener("submit", Login);

function Login(eve) {
  eve.preventDefault();
  if (!login_email.value) {
    return console.log("아이디를 입력해주세요");
  }
  if (!login_pw.value) {
    return console.log("비밀번호를 입력해주세요");
  }
  const req = {
    email: login_email.value,
    pw: login_pw.value,
  };
  fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        sessionStorage.setItem("email", req.email);
        location.href = "./Main";
      } else {
        if (res.err) return console.log(res.err);
        console.log(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"));
    });
}

function Register() {
  if (!register_email.value) {
    return console.log("이메일을 입력해주세요");
  }
  if (resgister_pw.value !== confirm_pw.value) {
    return console.log("비밀번호 불일치");
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
        // location.href = "/";
      } else {
        if (res.err) return console.log(res.err);
        console.log(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error("회원가입 중 에러 발생"));
    });
}
