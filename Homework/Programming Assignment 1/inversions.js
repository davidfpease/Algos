const fs = require('fs');

let data = fs.readFileSync('IntegerArray.txt').toString().replace(/\r\n/g, '\n').split('\n');

data = data.map(num => +num);

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
      mergedArray.push(lArr[0]);
      lArr.shift();
    } else {
      mergedArray.push(rArr[0]);
      rArr.shift();
    }
  }

  return mergedArray.concat(lArr, rArr);

}

let sorted = mergeSort(data);
console.log(sorted);
