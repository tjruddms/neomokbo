window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#today").click()
})
const startdate = document.querySelector("#start-date")
const enddate = document.querySelector("#end-date")

function selectDateRange(range) {
  let startDate, endDate;

  switch (range) {
    case 'today':
      startDate = endDate = new Date().toISOString().slice(0, 10);
      break;
    case 'this_week':
      startDate = new Date();
      endDate = new Date();
      startDate.setDate(startDate.getDate() - (7 - startDate.getDay()))

      startDate = startDate.toISOString().slice(0, 10);
      endDate = endDate.toISOString().slice(0, 10);
      break;
    case 'this_month':
      startDate = new Date();
      endDate = new Date();

      startDate.setDate(startDate.getDate() - (30 - startDate.getDay()))

      startDate = startDate.toISOString().slice(0, 10);
      endDate = endDate.toISOString().slice(0, 10);
      break;
    case 'this_year':
      startDate = new Date();
      endDate = new Date();

      startDate.setDate(startDate.getDate() - (365 - startDate.getDay()))

      startDate = startDate.toISOString().slice(0, 10);
      endDate = endDate.toISOString().slice(0, 10);
      break;
    default:
      return;
  }

  console.log('Selected date range:', startDate, endDate);

  // start와 end 요소에 값 할당
  document.getElementById('start-date').value = startDate;
  document.getElementById('end-date').value = endDate;
  document.getElementById('start-date').dispatchEvent(new Event('input'))

  // 여기서 선택한 날짜 범위를 처리하는 추가적인 로직을 구현할 수 있습니다.
}

function showCustomDateRange() {
  document.getElementById('custom-date-range-picker').style.display = 'block';
}

function selectCustomDateRange() {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;

  console.log('Selected custom date range:', startDate, endDate);
  // 여기서 선택한 날짜 범위를 처리하는 추가적인 로직을 구현할 수 있습니다.

}

var colors = ['red', 'green', 'blue', 'yellow', 'purple']

startdate.addEventListener("input", () => {
  GetDatas()
})

enddate.addEventListener("input", () => {
  GetDatas()
})

function GetDatas() {

  var chartdata = {
    type: 'horizontalBar',
    data: {
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: []
        }
      ]
    },
    options: {
      animation: {
        duration: 3000,
        easing: 'easeInOutCubic'
      },
      legend: { display: false },
      title: {
        display: true,
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#243040',
            beginAtZero: true
          },
          gridLines: {
            lineWidth: 3
          },
          backgroundColor: 'red'
        }],
        yAxes: [{
          ticks: {
            fontColor: '#243040',
          },
          gridLines: {
            lineWidth: 3
          },
          backgroundColor: 'yellow'
        }]
      }
    }
  }

  fetch("/GetMyDataByDate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: sessionStorage.email,
      start: document.querySelector("#start-date").value,
      end: document.querySelector("#end-date").value,
    })
  })
    .then(response => response.json())
    .then((data) => {
      var adddata = {}
      data.forEach((element) => {
        if (adddata[element['class']] > 0) {
          adddata[element['class']]++;
        }
        else {
          adddata[element['class']] = 1;
        }
      });
      Object.keys(adddata).forEach((element, idx) => {
        chartdata.data.labels.push(element + "소리")
        chartdata.data.datasets[0]['data'].push(adddata[element].toString())
        chartdata.data.datasets[0].backgroundColor.push(colors[idx])
      })
      new Chart(document.getElementById("bar-chart-horizontal"), chartdata);
    })
}
