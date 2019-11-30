import { Piece } from "./Piece.js";
import { shuffle } from "./utils.js";
import { RedPiece } from "./RedPiece.js";

export class Puzzle {
  constructor(canvas, image, width = 4, height = 4) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.image = image
    this.width = width;
    this.height = height;

    this.canvas.width = image.width;
    this.canvas.height = image.height;

    this.pieceWidth = canvas.width / this.width;
    this.pieceHeight = canvas.height / this.height;

    this.pieces = [];

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.pieces.push(
          new Piece(i, j, this.pieceWidth, this.pieceHeight, this.image)
        );
      }
    }

    this.redPieceIdx = 0;

    this.canvas.addEventListener("click", event => {
      const pieceX = Math.floor(
        (event.layerX / this.canvas.width) * this.width
      );
      const pieceY = Math.floor(
        (event.layerY / this.canvas.height) * this.height
      );

      this.moveRedPiece(pieceX, pieceY);

      this.draw();
    });

    this.canvas.addEventListener("mousemove", event => {
      const pieceX = Math.floor(
        (event.layerX / this.canvas.width) * this.width
      );
      const pieceY = Math.floor(
        (event.layerY / this.canvas.height) * this.height
      );

      this.draw();

      if (!this.isAdjacentToRed(pieceX, pieceY)) return;

      this.context.fillStyle = "rgba(227, 27, 66, 0.5)";
      this.context.fillRect(
        pieceX * this.pieceWidth,
        pieceY * this.pieceHeight,
        this.pieceWidth,
        this.pieceHeight
      );
    });

    this.canvas.addEventListener("mouseleave", () => this.draw())
  }

  shufflePieces() {
    const newPieces = shuffle(this.pieces);
    newPieces[this.redPieceIdx] = new RedPiece(
      this.pieceWidth,
      this.pieceHeight
    );
    return newPieces;
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.curPieces.forEach((piece, i) => {
      const row = Math.floor(i / this.width);
      const column = i % this.width;

      piece.draw(this.context, row, column);
    });
  }

  init() {
    this.redPieceIdx = 0;
    this.curPieces = this.shufflePieces();
    this.draw();
  }

  isAdjacentToRed(x, y) {
    const redY = Math.floor(this.redPieceIdx / this.width);
    const redX = this.redPieceIdx % this.height;

    return Math.abs(redX - x) + Math.abs(redY - y) == 1;
  }

  moveRedPiece(x, y) {
    const newRedIdx = this.width * y + x;

    if (!this.isAdjacentToRed(x, y)) return;

    [this.curPieces[this.redPieceIdx], this.curPieces[newRedIdx]] = [
      this.curPieces[newRedIdx],
      this.curPieces[this.redPieceIdx]
    ];

    this.redPieceIdx = newRedIdx;
  }
}
