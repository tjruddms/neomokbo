$(document).ready(function () {
  const password = document.querySelector(".password")
  const confirmPassword = document.querySelector(".confirmPassword")
  // 변경하기 버튼 클릭 시 알림 메시지 표시
  $(".changebtn").click(function () {
    if (password.value !== confirmPassword.value) {
      console.log("비밀번호 불일치");
      return;
    }
    const req = {
      email: sessionStorage.email,
      pw: password.value
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
          console.log(res);
        } else {
          if (res.err) return console.log(res.err);
          console.log(res.msg);
        }
      })
      .catch((err) => {
        console.error(new Error("로그인 중 에러 발생"));
      });
  });

  // 탈퇴하기 버튼 클릭 시 알림 메시지 표시
  $(".exitbtn").click(function () {
    if (confirm("정말로 탈퇴하시겠습니까?")) {
      console.log(sessionStorage.email);
      const req = {
        email: sessionStorage.email,
      };
      fetch("/deleteacc", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            sessionStorage.clear();
            location.href = "/";
          } else {
            if (res.err) return console.log(res.err);
            console.log(res.msg);
          }
        })
        .catch((err) => {
          console.error(new Error("로그인 중 에러 발생"));
        });
    }
  });
});
