window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#today").click()
})

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
