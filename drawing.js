const BACKGROUND_COLOUR = '#000000';
const LINE_COLOUR = '#FFFFFF';
const LINE_WIDTH = 15;

// Extract the canvas border width from CSS file and convert it to an integer
// to be able to use it in calculation of currentX and currentY when drawing
// since the canvas border width has an influence on the canvas coordinates
const CANVAS_ELEMENT = document.querySelector('.canvas1');
const CANVAS_STYLE = window.getComputedStyle(CANVAS_ELEMENT);
const CANVAS_BORDER_WIDTH = parseInt(CANVAS_STYLE.borderTopWidth);
// console.log(CANVAS_BORDER_WIDTH);

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var context;

function preventDefault(e) {
    e.preventDefault();
}

function disableScroll() {
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
}

function enableScroll() {
    document.body.removeEventListener('touchmove', preventDefault);
}

function prepareCanvas() {
    // console.log('Preparing Canvas');
    canvas = document.getElementById('my-canvas');
    context = canvas.getContext('2d');

    context.fillStyle = BACKGROUND_COLOUR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';

    var isPainting = false;

    // Mouse Events
    canvas.addEventListener('mousedown', function (event) {
        // console.log('Mouse Pressed');
        isPainting = true;
        currentX = event.clientX - canvas.getBoundingClientRect().left - CANVAS_BORDER_WIDTH;
        currentY = event.clientY - canvas.getBoundingClientRect().top - CANVAS_BORDER_WIDTH;

    });

    canvas.addEventListener('mousemove', function (event) {

        if (isPainting) {
            previousX = currentX;
            currentX = event.clientX - canvas.getBoundingClientRect().left - CANVAS_BORDER_WIDTH;

            previousY = currentY;
            currentY = event.clientY - canvas.getBoundingClientRect().top - CANVAS_BORDER_WIDTH;

            draw();
        }

    });


    canvas.addEventListener('mouseup', function (event) {
        // console.log('Mouse Released');
        isPainting = false;

    });

    canvas.addEventListener('mouseleave', function (event) {
        isPainting = false;

    });

    // Touch Events
    canvas.addEventListener('touchstart', function (event) {
        // console.log('Touchdown!');
        isPainting = true;
        currentX = event.touches[0].clientX - canvas.getBoundingClientRect().left -CANVAS_BORDER_WIDTH;
        currentY = event.touches[0].clientY - canvas.getBoundingClientRect().top - CANVAS_BORDER_WIDTH;
        disableScroll();

    });

    canvas.addEventListener('touchmove', function (event) {

        if (isPainting) {
            previousX = currentX;
            currentX = event.touches[0].clientX - canvas.getBoundingClientRect().left - CANVAS_BORDER_WIDTH;

            previousY = currentY;
            currentY = event.touches[0].clientY - canvas.getBoundingClientRect().top - CANVAS_BORDER_WIDTH;

            draw();
        }

    });


    canvas.addEventListener('touchend', function (event) {
        // console.log('Touchup!');
        isPainting = false;
        enableScroll();

    });

    canvas.addEventListener('touchcancel', function (event) {
        isPainting = false;

    });
}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas() {
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}