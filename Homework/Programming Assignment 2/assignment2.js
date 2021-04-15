const fs = require('fs');

let data = fs.readFileSync('QuickSort.txt').toString().replace(/\r\n/g, '\n').split('\n');

//data = data.slice(0,10);

data = data.map(num => +num);

//let data = [5,4,3,2,1];
console.log(`Data.length is ${data.length}`);

/// pivot point is the first element
let comparisons = 0;


const partition = (arr, left, right) => {

  let pivot = arr[left];
  let i = left + 1;

  for (let j = left +1; j <= right; j++){
    comparisons ++;
    if(arr[j] < pivot){
      [arr[j], arr[i]] = [arr[i], arr[j]];
      i++;
    }
  }
  [arr[left], arr[i-1]] = [arr[i-1],arr[left]];
  return i-1;
}

//each choosePivot method dolves one of the subproblems
const choosePivotLeftElement = (arr, left, right) => {
  return left;
}
const choosePivotRightElement = (arr, left, right) => {
  return right;
}
const choosePivotMedian = (arr, left, right) => {
  let len = right-left+1;
  if (len < 3){
    return left;
  }
  let group = [];
  let indices = [];
  let l = arr[left];
  group.push(l);
  indices.push(left);
  let r = arr[right];
  if (r > l) {
    group.push(r);
    indices.push(right);
  } else {
    group.unshift(r);
    indices.unshift(right);
  }

  let mIndex = 0;
  let m = 0;

  if(len % 2 === 0 ){
    mIndex = (len / 2) - 1;
    m = arr[mIndex];
  } else {
    mIndex = Math.floor(len / 2);
    m = arr[mIndex];
  }
  
  if(m < group[0]){
    group.unshift(m);
    indices.unshift(mIndex);
  } else if (m > group[1]){
    group.push(m);
    indices.push(mIndex);
  } else {
    group.splice(1,0,m);
    indices.splice(1,0,mIndex);
  }
  return indices[1];
}

const quickSort = (arr, left = 0 , right = arr.length-1, recursiveCall = false) => {
  
  if(left >= right){
    return
  }

  // let i = choosePivotLeftElement(arr, left, right);
  // let i = choosePivotRightElement(arr, left, right);
  let i = choosePivotMedian(arr, left, right);

  //preprocessing step of moving the selected pivot to the first positions of subarray
  [arr[left], arr[i]] = [arr[i], arr[left]];

  let newPivot = partition(arr, left, right);
  
  quickSort(arr, left, newPivot-1, true);

  //this should not be the entire length of the array for "right" every time.
  quickSort(arr, newPivot+1, right, true); 

  
}

//console.log(data);
quickSort(data);
console.log(data.slice(9990));
console.log(comparisons);


