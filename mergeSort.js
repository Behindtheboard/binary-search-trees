function merge(left, right) {
  let mergedArr = [];
  let i = 0,
    j = 0,
    k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      mergedArr[k++] = left[i++];
    } else {
      mergedArr[k++] = right[j++];
    }
  }
  for (; i < left.length; i++) {
    mergedArr[k++] = left[i];
  }
  for (; j < right.length; j++) {
    mergedArr[k++] = right[j];
  }

  return mergedArr;
}

export default function mergeSort(arr) {
  let x = arr;
  if (arr.length === 1) return arr;

  const mid = Math.ceil(arr.length / 2);
  const y = x.splice(mid)

  return merge(mergeSort(x), mergeSort(y));
}

console.log(mergeSort([105, 79, 100, 110]));
