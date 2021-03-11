const fs = require('fs');

let data = fs.readFileSync('IntegerArray.txt').toString().replace(/\r\n/g, '\n').split('\n');

data = data.map(num => +num);

console.log(`Data.length is ${data.length}`);


const mergeSort = (array, inversions=0) => {
  if (array.length <= 1){
    return {array,
      inversions}
  }

  let midpoint = Math.floor(array.length/2);

  let leftArray = mergeSort(array.splice(0,midpoint), inversions);
  let rightArray = mergeSort(array, inversions);

  return merge(leftArray.array,rightArray.array, 
    (leftArray.inversions + rightArray.inversions));



}

const merge = (lArr, rArr, inversions) => {
  let mergedArray = [];
  

  while(lArr.length > 0 && rArr.length > 0){
    if(lArr[0] <= rArr[0]){
      mergedArray.push(lArr[0]);
      lArr.shift();
    } else {
      mergedArray.push(rArr[0]);
      rArr.shift();
      inversions += lArr.length;
    }
  }

  return {
    array: mergedArray.concat(lArr, rArr),
    inversions};

}

let sorted = mergeSort(data);
console.log(sorted.inversions);
