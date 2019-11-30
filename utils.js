export function evenlyShuffle(array) {
  let a = array.slice(1);
  let indices = a.map((_, i) => i);
  for (let i = 0; i < a.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  let inversions = 0;
  for (let i in indices) {
    for (let j=i+1; j<indices.length; j++) {
      if (indices[j] < indices[i]) inversions++;
    }
  }

  if (inversions % 2 == 1) {
    [a[0], a[1]] = [a[1], a[0]];
  }
  return [array[0], ...a];
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
