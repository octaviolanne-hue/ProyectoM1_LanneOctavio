
const boton = document.getElementById("btnColor")

boton.addEventListener("click", cambiarColores);

function cambiarColores() {

const boxes = document.querySelectorAll(".box");

const inicio = Math.floor(Math.random() * 360);



boxes.forEach((box, index) => {
    const numBox = boxes.length
    const hue = (inicio + index * (Math.floor(360/numBox))) % 360;
    const sat = Math.floor(Math.random()*100)
    console.log((Math.floor(360/numBox)) % 360)
    const lum = Math.floor(Math.random()*100)
    box.style.backgroundColor =
    `hsl(${hue}, ${sat}%, ${lum}%)`;

    
});

}