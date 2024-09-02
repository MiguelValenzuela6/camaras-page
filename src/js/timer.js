const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const countdownElement = document.getElementById("countdown");
const finishedElement = document.getElementById("finished");
const headerElement = document.getElementById("header");
const endDate = new Date("October 10, 2024 08:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = endDate - now;

  if (timeLeft < 0) {
    countdownElement.style.display = "none";
    headerElement.style.display = "none";
    finishedElement.style.display = "block";
    finishedElement.style.animation =
      "neon 1.5s ease-in-out infinite alternate";
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  daysEl.textContent = days.toString().padStart(2, "0");
  hoursEl.textContent = hours.toString().padStart(2, "0");
  minutesEl.textContent = minutes.toString().padStart(2, "0");
  secondsEl.textContent = seconds.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
