const container = document.querySelector(".container");

const btnCambiar = document.getElementById("btnColor");

const mensajeCopiado =
  document.getElementById("copiado");

const botonesCantidad =
  document.querySelectorAll("[data-cantidad]");

let cantidadActual = 6;

let modoActual = "hsl";

const botonesModo =
  document.querySelectorAll("[data-modo]");

crearBoxes(cantidadActual);

botonesModo.forEach(boton => {

  boton.addEventListener("click", () => {

    modoActual =
      boton.dataset.modo;

    cambiarColores();

  });

});

function rgbToHex(r, g, b) {

  return "#" +

    r.toString(16).padStart(2, "0") +

    g.toString(16).padStart(2, "0") +

    b.toString(16).padStart(2, "0");

}

function hslToHex(h, s, l) {

  s /= 100;
  l /= 100;

  const c =
    (1 - Math.abs(2 * l - 1)) * s;

  const x =
    c * (1 - Math.abs((h / 60) % 2 - 1));

  const m =
    l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;


  if (h < 60) {

    r = c;
    g = x;

  }

  else if (h < 120) {

    r = x;
    g = c;

  }

  else if (h < 180) {

    g = c;
    b = x;

  }

  else if (h < 240) {

    g = x;
    b = c;

  }

  else if (h < 300) {

    r = x;
    b = c;

  }

  else {

    r = c;
    b = x;

  }

  r =
    Math.round((r + m) * 255);

  g =
    Math.round((g + m) * 255);

  b =
    Math.round((b + m) * 255);

  return rgbToHex(r, g, b);

}

botonesCantidad.forEach(boton => {

  boton.addEventListener("click", () => {

    cantidadActual =
      Number(boton.dataset.cantidad);

    crearBoxes(cantidadActual);

  });

});



btnCambiar.addEventListener("click", cambiarColores);



function crearBoxes(cantidad) {

  container.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {

    const item = document.createElement("div");

    item.classList.add("color-item");

    const box = document.createElement("div");

    box.classList.add("box");

    const code = document.createElement("p");

    code.classList.add("color-code");

    code.addEventListener("click", copiarCodigo);

    const lock = document.createElement("button");

    lock.classList.add("lock-btn");

    lock.textContent = "🔓";

    lock.addEventListener("click", () => {

      item.classList.toggle("locked");

      if (item.classList.contains("locked")) {

        lock.textContent = "🔒";

      }

      else {

        lock.textContent = "🔓";

      }

});

box.appendChild(lock);

item.appendChild(box);

item.appendChild(code);

container.appendChild(item);
  }

  cambiarColores();

}

function copiarCodigo(event) {

  const texto =

  event.currentTarget
    .querySelector(".hex-code")
    .innerText;

  navigator.clipboard.writeText(texto);

  mensajeCopiado.classList.add("mostrar");

  setTimeout(() => {

    mensajeCopiado.classList.remove("mostrar");

  }, 1500);

}

function cambiarColores() {

  const items =
    document.querySelectorAll(".color-item");

  const inicio =
    Math.floor(Math.random() * 360);

  const separacion =
    360 / items.length;

  items.forEach((item, index) => {

    if (item.classList.contains("locked")) {
    return;
    }

    const box =
      item.querySelector(".box");

    const code =
      item.querySelector(".color-code");


    const hue =
      (inicio + separacion * index) % 360;

let color = "";



if (modoActual === "hsl") {

  color =
    `hsl(${hue}, 80%, 50%)`;


  const hex =
  hslToHex(hue, 80, 50);

  code.innerHTML = `

    <span class="hex-code">
      ${hex}
    </span>

    <span class="code-type">
      HSL
    </span>

    <span class="code-value">
      ${hue}, 80%, 50%
    </span>

  `;

}

else {

  const r =
    Math.floor(Math.random() * 256);

  const g =
    Math.floor(Math.random() * 256);

  const b =
    Math.floor(Math.random() * 256);

  const a =
    Math.random().toFixed(2);


  color =
    `rgba(${r}, ${g}, ${b}, ${a})`;


  const hex =
  rgbToHex(r, g, b);

  code.innerHTML = `

    <span class="hex-code">
      ${hex}
    </span>

    <span class="code-type">
      RGBA
    </span>

    <span class="code-value">
      ${r}, ${g}, ${b}, ${a}
    </span>

  `;

}

box.style.backgroundColor = color;

  });

}
