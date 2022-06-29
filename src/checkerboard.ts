/**
 * Determines the colour of a pixel (x, y) to create 
 * a checkerboard pattern and saves it into the data array.
 * The data array holds the linearised pixel data of the target canvas
 * row major. Each pixel is of RGBA format.
 * @param data The linearised pixel array
 * @param x The x coordinate of the pixel
 * @param y The y coordinate of the pixel
 * @param width The width of the canvas
 * @param height The height of the canvas
 */
export function checkerboard(data: Uint8ClampedArray, x: number, y: number, width: number, height: number) {
    const pane_size = width / 8;
    const x_pane = Math.floor(x / pane_size);
    const y_pane = Math.floor(y / pane_size);
    const isEven = (x_pane + y_pane) % 2 === 1;
    const offset = (y * width + x) * 4;
    data[offset] = isEven ? 255 : 0;
    data[offset + 1] = isEven ? 255 : 0;
    data[offset + 2] = isEven ? 255 : 0;
    data[offset + 3] = 255;
}