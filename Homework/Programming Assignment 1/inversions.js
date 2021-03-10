const fs = require('fs');

const data = fs.readFileSync('IntegerArray2.txt').toString().replace(/\r\n/g, '\n').split('\n');

console.log(`Data.length is ${data.length}`);


const mergeSort = (array) => {
  if (array.length <= 1){
    return array;
  }

  let midpoint = Math.floor(array.length/2);

  let leftArray = mergeSort(array.splice(0,midpoint));
  let rightArray = mergeSort(array);

  return merge(leftArray,rightArray);

}

const merge = (lArr, rArr) => {
  let mergedArray = [];

  while(lArr.length > 0 && rArr.length > 0){
    if(lArr[0] <= rArr[0]){
      mergedArray.push(lArr.splice(0,1));
    } else {
      mergedArray.push(rArr.splice(0,1));
    }
  }

  return mergedArray.concat(lArr, rArr);

}

let sorted = mergeSort(data);
console.log(sorted);
