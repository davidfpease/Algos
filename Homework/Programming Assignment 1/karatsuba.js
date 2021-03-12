// const num1 = '3141592653589793238462643383279502884197169399375105820974944592';
// const num2 = '2718281828459045235360287471352662497757247093699959574966967627';
const num1 = '31412653589793238462643383279502884';//197169399375105820974944592';
const num2 = '27181828459045235360287471352662497';//757247093699959574966967627';
// const num1 = '3141';
// const num2 = '2718';

const closeKaratsuba = (x,y) => {


  if (x.length <= 1 || y.length <=1){
    return +x*+y;
  }

  let midpoint = x.length/2
  let a = x.slice(0,midpoint);
  let b = x.slice(midpoint);
  let c = y.slice(0,midpoint);
  let d = y.slice(midpoint);

  let ac = closeKaratsuba(a,c);
  let ad = closeKaratsuba(a,d);
  let bc = closeKaratsuba(b,c);
  let bd = closeKaratsuba(b,d);

  return Math.pow(10,x.length)*ac + Math.pow(10, x.length/2) * (ad + bc) + bd;

}


const karatsuba = (x,y) => {

  //the recursion fails when the number of digits in x or y is not even
  //I don't know how to handle the situation with x and y of different lengths
  let n = Math.min(x.length, y.length);
  let o = Math.max(x.length, y.length);


  if (n === 1){
    return BigInt((+x*+y));
  }

  let midpoint = Math.floor(n/2);
  let a = BigInt(x.slice(0,midpoint));
  let b = BigInt(x.slice(midpoint));
  let c = BigInt(y.slice(0,midpoint));
  let d = BigInt(y.slice(midpoint));
  let p = (a + b);
  let q = (c + d);


  let ac = karatsuba(a.toString(),c.toString());
  let bd = karatsuba(b.toString(),d.toString());
  let pq = karatsuba(p.toString(),q.toString());

  let adbc = pq-ac-bd;
  let zeroes = '1';
  for (let i = 0; i < o; i++){
    zeroes += '0';
  }
  let zeroes2 = '1';
  for (let i = 0; i < o/2; i++){
    zeroes2 += '0';
  }

  let powTen = BigInt(zeroes);
  let powTen2 = BigInt(zeroes2);

  return BigInt(powTen*ac + powTen2 * adbc + bd);



}

//console.log(karatsuba(num1, num2));
//console.log(BigInt(num1)*BigInt(num2));
console.log(BigInt(num1) * BigInt(num2) - karatsuba(num1, num2));