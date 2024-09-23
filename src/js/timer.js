import { format} from "@formkit/tempo"

const daysEl = document.getElementById("days");
const endDate = new Date("September 26, 2024 13:07:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = new Date(endDate - now);

  if (timeLeft < 0) {
    countdownElement.style.display = "none";
    headerElement.style.display = "none";
    finishedElement.style.display = "block";
    finishedElement.style.animation =
      "neon 1.5s ease-in-out infinite alternate";
    return;
  }

  const time = format(timeLeft, "HH:mm:ss");

  const day =  format(timeLeft, "D");

  const textDay = Number(day) > 1 ? `días` : `día`;

  daysEl.textContent =   `${day} ${textDay} y ${time}`;

}

setInterval(updateCountdown, 1000);
updateCountdown();
