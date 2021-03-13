const num1 = BigInt('3141592653589793238462643383279502884197169399375105820974944592');
const num2 = BigInt('2718281828459045235360287471352662497757247093699959574966967627');

const karatsuba2 = (x, y) => {
  if (x < 10 || y < 10) {
    return x * y;
  }

  let n = Math.max(x.toString().length, y.toString().length);
  let m = Math.ceil(n / 2);


  // build power of ten multipliers using strings as Math.pow adds nonsense 
  // numbers after an n grater than 22
  let zeroes = '1';
  for (let i = 0; i < m; i++) {
    zeroes += '0';
  }
  let zeroes2 = '1';
  for (let i = 0; i < m * 2; i++) {
    zeroes2 += '0';
  }

  let powTen = BigInt(zeroes);
  let powTen2 = BigInt(zeroes2);

  let xH = x / powTen;
  let xL = x % powTen;

  let yH = y / powTen;
  let yL = y % powTen;

  let a = karatsuba2(xH, yH);
  let d = karatsuba2(xL, yL);
  let e = karatsuba2(xH + xL, yH + yL) - a - d;

  return (a * powTen2 + e * powTen + d);

}

console.log(BigInt(num1) * BigInt(num2));
console.log(BigInt(karatsuba2(num1, num2)));
console.log(BigInt(num1) * BigInt(num2) - BigInt(karatsuba2(num1, num2)));



// // const num1 = '3141592653589793238462643383279502884197169399375105820974944592';
// // const num2 = '2718281828459045235360287471352662497757247093699959574966967627';
// // const num1 = '3141265'//35'//89793238'//462643383279502884';//197169399375105820974944592';
// // const num2 = '2718182'//84'//59045235'//360287471352662497';//757247093699959574966967627';
// // const num1 = '31412';
// // const num2 = '27181';

// const closeKaratsuba = (x,y) => {


//   if (x.length <= 1 || y.length <=1){
//     return +x*+y;
//   }

//   let midpoint = x.length/2
//   let a = x.slice(0,midpoint);
//   let b = x.slice(midpoint);
//   let c = y.slice(0,midpoint);
//   let d = y.slice(midpoint);

//   let ac = closeKaratsuba(a,c);
//   let ad = closeKaratsuba(a,d);
//   let bc = closeKaratsuba(b,c);
//   let bd = closeKaratsuba(b,d);

//   return Math.pow(10,x.length)*ac + Math.pow(10, x.length/2) * (ad + bc) + bd;

// }


// const karatsuba = (x,y) => {

//   //the recursion fails when the number of digits in x or y is not even
//   //I don't know how to handle the situation with x and y of different lengths
//   let n = Math.min(x.length, y.length);
//   // let o = Math.max(x.length, y.length);


//   if (n === 1){
//     return BigInt((+x*+y));
//   }

//   let zeroes = '1';
//   for (let i = 0; i < 2*Math.floor(n/2); i++) {
//     zeroes += '0';
//   }
//   let zeroes2 = '1';
//   for (let i = 0; i < Math.floor(n / 2); i++) {
//     zeroes2 += '0';
//   }

//   let powTen = BigInt(zeroes);
//   let powTen2 = BigInt(zeroes2);

//   let midpoint = Math.floor(n/2);
//   let a = BigInt(x.slice(0,midpoint));
//   let b = BigInt(x.slice(midpoint));
//   let c = BigInt(y.slice(0,midpoint));
//   let d = BigInt(y.slice(midpoint));
//   let p = (a + b);
//   let q = (c + d);


//   let ac = karatsuba(a.toString(),c.toString());
//   let bd = karatsuba(b.toString(),d.toString());
//   let pq = karatsuba(p.toString(),q.toString());

//   let adbc = pq-ac-bd;


//   return BigInt(powTen*ac + powTen2 * adbc + bd);



// }

//console.log(karatsuba(num1, num2));
//console.log(BigInt(num1)*BigInt(num2));
// console.log(BigInt(num1) * BigInt(num2));
// console.log(karatsuba(num1, num2));

// function karatsubaMulti(x, y) {

//   let n = Math.min(x.toString().length, y.toString().length);

//   if (n == 1)
//     return x * y;

//   let tenpowhalfn = Math.pow(10, Math.floor(n / 2));
//   let tenpown = Math.pow(10, 2 * Math.floor(n / 2));

//   let zeroes = '1';
//   for (let i = 0; i < 2 * Math.floor(n / 2); i++) {
//     zeroes += '0';
//   }
//   let zeroes2 = '1';
//   for (let i = 0; i < Math.floor(n / 2); i++) {
//     zeroes2 += '0';
//   }

//   let powTen = BigInt(zeroes);
//   let powTen2half = BigInt(zeroes2);

//   let a = Math.floor(x / tenpowhalfn);
//   let b = x % tenpowhalfn;
//   let c = Math.floor(y / tenpowhalfn);
//   let d = y % tenpowhalfn;

//   let caller = arguments.callee;

//   return tenpown * caller(a, c) + tenpowhalfn * (caller(a, d) + caller(b, c)) + caller(b, d);
// }

// console.log(BigInt(num1) * BigInt(num2));
// console.log(BigInt(karatsubaMulti(num1, num2)));

