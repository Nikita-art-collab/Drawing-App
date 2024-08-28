const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeSpan = document.getElementById('size');

const clearBtn = document.getElementById('clear');

const eraserBtn = document.getElementById('eraser');
let isErasing = false;

const colorPicker = document.getElementById('color');

colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
    if (!isErasing) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
    }
});


eraserBtn.addEventListener('click', () => {
    isErasing = !isErasing;
    if (isErasing) {
        eraserBtn.style.border = '2px solid red';  
        color = '#f5f5f5';  
    } else {
        eraserBtn.style.border = 'none';
        color = document.getElementById('color').value;  
    }
});


clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
});


increaseBtn.addEventListener('click', () => {
    size += 1;
    if (size > 50) size = 50; 
    sizeSpan.innerText = size;
});

decreaseBtn.addEventListener('click', () => {
    size -= 1;
    if (size < 1) size = 1;
    sizeSpan.innerText = size;
});

let size = 20
let isPressed = false
let color = 'black'
let x
let y

canvas.addEventListener('mousedown', (e) => {
    isPressed = true
    x = e.offsetX
    y = e.offsetY
})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false
    x = undefined
    y = undefined
})

canvas.addEventListener('mousemove', (e) => {
    if(isPressed) {
        const x2 = e.offsetX
        const y2 = e.offsetY
        drawCircle(x2, y2)
        drawLine(x, y, x2, y2)

        x = x2
        y = y2
    }
})

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.lineWidth = size * 2
    ctx.stroke()
}

