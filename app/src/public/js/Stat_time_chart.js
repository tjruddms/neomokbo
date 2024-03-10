const startdate = document.querySelector("#start-date")
const enddate = document.querySelector("#end-date")

startdate.addEventListener("input", () => {
  // drawmark();
})

enddate.addEventListener("input", () => {
  // drawmark();
})


new Chart(document.getElementById("bar-chart-horizontal"), {
  type: 'horizontalBar',
  data: {
    labels: ["경적소리", "개짖는소리", "초인종소리", "화재경보음", "사이렌소리"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["#E60000", "#FAEC19", "darkgreen", "blue", "purple"], // 데이터셋의 배경색 변경
        data: [2478, 5267, 734, 784, 433]
      }
    ]
  },
  options: {
    animation: {
      duration: 3000, // 애니메이션 지속 시간 (밀리초)
      easing: 'easeInOutCubic' // 애니메이션 이징 (선택사항)
    },
    legend: { display: false },
    title: {
      display: true,
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: '#243040', // x축 텍스트 색상
        },
        gridLines: {
          lineWidth: 3 // x축 선 굵기
        },
        backgroundColor: 'red' // x축 배경색 변경
      }],
      yAxes: [{
        ticks: {
          fontColor: '#243040', // y축 텍스트 색상
        },
        gridLines: {
          lineWidth: 3 // y축 선 굵기
        },
        backgroundColor: 'yellow' // y축 배경색 변경
      }]
    }
  }
});
