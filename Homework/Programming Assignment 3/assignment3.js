const fs = require('fs');

const minCuts = ()=>{
  let data = fs.readFileSync('kargerMinCut.txt').toString().split('\n');
  
  let adjacencyList = {};
  
  data.forEach(line =>{
    lineArray = line.replace(/\r/g,"").split('\t');
    lineArray.pop();
    adjacencyList[lineArray[0]] = lineArray.slice(1);
  })
  
  let listLength = Object.keys(adjacencyList).length;
  
  while ( listLength > 2 ){
    
    //pick vertice A 
    let randomIndex = Math.floor(Math.random() * (listLength - 1));

    let verticeA = Object.keys(adjacencyList)[randomIndex];

    let listA = adjacencyList[verticeA];

    //let vertice B be the first available vertice in A's list
    let verticeB = listA[0]; 

    let listB = adjacencyList[verticeB];

    //remove self loops
    listA = listA.filter(vertice => vertice != verticeB);
    listB = listB.filter(vertice => vertice != verticeA);

    listA = listA.concat(listB);

    adjacencyList[verticeA] = listA;

    updateAllLists(adjacencyList, verticeA, verticeB);

    delete adjacencyList[verticeB];
    listLength--;
  
  }

  return adjacencyList[Object.keys(adjacencyList)[1]].length;
}

const updateAllLists = (aL, vA, vB) => {
  return Object.keys(aL).forEach(key => {
    aL[key] = aL[key].map(vertice => vertice == vB ? vA : vertice);
  })
}

let value = minCuts();

for(let i = 0; i <100; i++){
  let newVal = minCuts();
  if(newVal < value){
    value = newVal;
  }
}

console.log(value);
