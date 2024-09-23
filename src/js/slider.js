const slider = document.querySelector(".slider .carousel");
const items = document.querySelectorAll(".slider .carousel .carousel-item");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const dots = document.querySelectorAll(".slider .dots li");

const lengthItems = items.length - 1;
let active = 0;
let isAutoScrolling = false;

next.onclick = () => {
	active = active + 1 <= lengthItems ? active + 1 : 0;
	scrollToActiveItem();
};

prev.onclick = () => {
	active = active - 1 >= 0 ? active - 1 : lengthItems;
	scrollToActiveItem();
};

function scrollToActiveItem() {
	const item = document.getElementById(`item${active + 1}`);
	const targetScrollX = item.offsetLeft;

	isAutoScrolling = true; // Evita conflictos entre el scroll manual y automático

	// Desplaza suavemente en X dentro del contenedor .carousel
	slider.scrollTo({
		left: targetScrollX,
		behavior: "smooth",
	});

	reloadSlider();

	setTimeout(() => {
		isAutoScrolling = false; // Permite que se detecte el scroll manual después de la animación
	}, 500); // Tiempo de la animación
}

let refreshInterval = setInterval(() => {
	next.click();
}, 3000);

function reloadSlider() {
	const last_active_dot = document.querySelector(".slider .dots li.active");
	last_active_dot.classList.remove("active");
	dots[active].classList.add("active");

	clearInterval(refreshInterval);
	refreshInterval = setInterval(() => {
		next.click();
	}, 3000);
}

// Detecta el scroll manual en el contenedor
slider.addEventListener("scroll", () => {
	if (isAutoScrolling) return; // Ignora el evento de scroll mientras se realiza el desplazamiento automático

	// Encuentra el elemento más cercano a la posición actual de desplazamiento
	let closestIndex = 0;
	let closestDistance = Math.abs(items[0].offsetLeft - slider.scrollLeft);

	items.forEach((item, index) => {
		const distance = Math.abs(item.offsetLeft - slider.scrollLeft);
		if (distance < closestDistance) {
			closestDistance = distance;
			closestIndex = index;
		}
	});

	// Actualiza el estado activo en función del elemento más cercano
	active = closestIndex;
	reloadSlider();
});

dots.forEach((li, key) => {
	li.addEventListener("click", () => {
		active = key;
		scrollToActiveItem();
	});
});

window.onresize = (event) => {
	reloadSlider();
};
