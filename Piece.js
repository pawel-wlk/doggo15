export class Piece {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.width = width;
    this.height = height;
  }

  draw(context, row, column) {
    const widthScale = this.image.naturalWidth / this.image.width;
    const heightScale = this.image.naturalHeight / this.image.height;
    context.drawImage(
      this.image,
      this.x * this.width * widthScale,
      this.y * this.height * heightScale,
      this.width * widthScale,
      this.height * heightScale,
      column * this.width,
      row * this.height,
      this.width,
      this.height
    );
  }
}
