document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const colorButtons = document.querySelectorAll('.colorButton');
    const pickColorButton = document.getElementById('pickColorButton');

    const ratio = window.devicePixelRatio;

    // Set canvas dimensions to match screen dimensions
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;

    // Set canvas CSS size to match screen dimensions
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';

    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.imageSmoothingEnabled = false;



    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let strokeColor = 'black'; // Default stroke color

    function getMousePos(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (event.clientX - rect.left) * scaleX,
            y: (event.clientY - rect.top) * scaleY
        };
    }

    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        const pos = getMousePos(event);
        [lastX, lastY] = [pos.x, pos.y];
    });

    canvas.addEventListener('mousemove', (event) => {
        if (!isDrawing) return;
        const pos = getMousePos(event);
        context.strokeStyle = strokeColor; // Set stroke color
        context.lineWidth = 2; // Set line width
        context.lineCap = 'round'; // Set line cap style
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(pos.x, pos.y);
        context.stroke();
        [lastX, lastY] = [pos.x, pos.y];
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });

    // Color button event listeners
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            strokeColor = button.style.backgroundColor;
        });
    });

    // Pick color button event listener
    pickColorButton.addEventListener('click', () => {
        const newColor = prompt('Enter a color (e.g., "red", "#00ff00", "rgb(0, 0, 255)"):');
        if (newColor) {
            strokeColor = newColor;
        }
    });
});
