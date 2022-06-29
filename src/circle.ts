/**
 * Determines the colour of a pixel (x, y) to create
 * a circle and saves it into the data array.
 * The data array holds the linearised pixel data of the target canvas
 * row major. Each pixel is of RGBA format.
 * @param data The linearised pixel array
 * @param x The x coordinate of the pixel
 * @param y The y coordinate of the pixel
 * @param width The width of the canvas
 * @param height The height of the canvas
 * @param radius The radius of the circle
 */
export function circle(data: Uint8ClampedArray, x: number, y: number, width: number, height: number, radius: number) {
    const offset = (y * width + x) * 4;
    const distance = Math.sqrt(Math.pow(x - width / 2, 2) + Math.pow(y - height / 2, 2));
    const isOutside = distance > radius;
    data[offset] = isOutside ? 255 : 0;
    data[offset + 1] = isOutside ? 255 : 0;
    data[offset + 2] = isOutside ? 255 : 0;
    data[offset + 3] = 255;
}
