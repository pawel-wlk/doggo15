export class RedPiece {
  color = '#e31b42'
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  draw(context, row, column) {
    context.fillStyle = this.color
    context.fillRect(column*this.width, row*this.height, this.width, this.height);
  }
}