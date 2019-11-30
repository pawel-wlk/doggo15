export function shuffle(array) {
  let a = [...array];
  for (let i = 0; i < a.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const loadImage = (image, src, size) =>
  new Promise((resolve, reject) => {
    if (size) {
      image.width = size;
      image.height = size;
    }
    image.addEventListener("load", resolve);
    image.addEventListener("error", reject);
    image.src = src;
  });
