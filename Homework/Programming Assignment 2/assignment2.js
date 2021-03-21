const fs = require('fs');

let data = fs.readFileSync('QuickSort.txt').toString().replace(/\r\n/g, '\n').split('\n');

data = data.slice(0,10);

data = data.map(num => +num);

console.log(`Data.length is ${data.length}`);

/// pivot point is the first element
let comparisons = 0;


const partition = (arr, left, right) => {

  let pivot = arr[left];
  let i = left + 1;

  for (let j = left +1; j <= right; j++){
    if(arr[j] < pivot){
      [arr[j], arr[i]] = [arr[i], arr[j]];
      //console.log(arr);
      i++;
    }
  }
  [arr[left], arr[i-1]] = [arr[i-1],arr[left]];
  return i-1;
}

const quickSort = (arr, left = 0 , right = arr.length-1) => {
  comparisons += right-left-1;
  if(left >= right){
    return
  }

  let i = left + 1;
  let newPivot = partition(arr, left, right);

  //console.log(arr);
  quickSort(arr, left, newPivot-1);
  quickSort(arr, newPivot+1, arr.length-1);
  
}


quickSort(data);
console.log(data);
console.log(comparisons);