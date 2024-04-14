document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        [lastX, lastY] = [event.offsetX, event.offsetY];
    });

    canvas.addEventListener('mousemove', (event) => {
        if (!isDrawing) return;
        context.strokeStyle = '#000'; // Set stroke color
        context.lineWidth = 2; // Set line width
        context.lineCap = 'round'; // Set line cap style
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        [lastX, lastY] = [event.offsetX, event.offsetY];
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseout', () => {
        isDrawing = false;
    });
});
