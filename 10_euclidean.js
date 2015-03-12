/*

Two positive integers N and M are given. Integer N represents the number of chocolates arranged in a circle, numbered from 0 to N − 1.

You start to eat the chocolates. After eating a chocolate you leave only a wrapper.

You begin with eating chocolate number 0. Then you omit the next M − 1 chocolates or wrappers on the circle, and eat the following one.

More precisely, if you ate chocolate number X, then you will next eat the chocolate with number (X + M) modulo N (remainder of division).

You stop eating when you encounter an empty wrapper.

For example, given integers N = 10 and M = 4. You will eat the following chocolates: 0, 4, 8, 2, 6.

The goal is to count the number of chocolates that you will eat, following the above rules.

Write a function:

    function solution(N, M); 

that, given two positive integers N and M, returns the number of chocolates that you will eat.

For example, given integers N = 10 and M = 4. the function should return 5, as explained above.

Assume that:

        N and M are integers within the range [1..1,000,000,000].

Complexity:

        expected worst-case time complexity is O(log(N+M));
        expected worst-case space complexity is O(1).

 */

function solution(N, M) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  return ((N * M) / gcd(N, M, 1)) / M;
}

function gcd(a, b, res) {
  if (a === b) {
    return res * a;
  }
  else if (a % 2 === 0 && b % 2 === 0) {
    return gcd(a / 2, b / 2, 2 * res);
  }
  else if (a % 2 === 0) {
    return gcd(a / 2, b, res);
  }
  else if (b % 2 === 0) {
    return gcd(a, b / 2, res);
  }
  else if (a > b) {
    return gcd(a - b, b, res);
  }
  else { // b > a
    return gcd(a, b - a, res);
  }
}

/*

A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

A prime D is called a prime divisor of a positive integer P if there exists a positive integer K such that D * K = P. For example, 2 and 5 are prime divisors of 20.

You are given two positive integers N and M. The goal is to check whether the sets of prime divisors of integers N and M are exactly the same.

For example, given:

        N = 15 and M = 75, the prime divisors are the same: {3, 5};
        N = 10 and M = 30, the prime divisors aren't the same: {2, 5} is not equal to {2, 3, 5};
        N = 9 and M = 5, the prime divisors aren't the same: {3} is not equal to {5}.

Write a function:

    function solution(A, B); 

that, given two non-empty zero-indexed arrays A and B of Z integers, returns the number of positions K for which the prime divisors of A[K] and B[K] are exactly the same.

For example, given:

    A[0] = 15   B[0] = 75
    A[1] = 10   B[1] = 30
    A[2] = 3    B[2] = 5

the function should return 1, because only one pair (15, 75) has the same set of prime divisors.

Assume that:

        Z is an integer within the range [1..6,000];
        each element of arrays A, B is an integer within the range [1..2147483647].

Complexity:

        expected worst-case time complexity is O(Z*log(max(A)+max(B))2);
        expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.
 
 */

function solution(A, B) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var count = 0;

  for (var z = 0; z < A.length; z++) {
    if (isCommonPrimeDivisor(A[z], B[z])) {
      count++;
    }
  }

  return count;
}

/* the gcd of x and y has the same common prime divisors as x and y themselves
 * by continuously applying the gcd x decreases to 1 consuming all the prime divisors 
 * or the gcd becomes 1 and we know that we cannot move further
 * same logic is applied to y
 */
function isCommonPrimeDivisor(x, y) {
  var xy_gcd = gcd(x, y, 1),
      x_gcd,
      y_gcd;

  while (x !== 1) { // until we consume all the divisors
    x_gcd = gcd(x, xy_gcd, 1);
    if (x_gcd === 1) { // gcd consumed first
      break;
    }
    x /= x_gcd;
  }

  if (x !== 1) return false;

  while (y !== 1) {
    y_gcd = gcd(y, xy_gcd, 1);
    if (y_gcd === 1) {
      break;
    }
    y /= y_gcd;
  }

  return y === 1;
}

function gcd(a, b, res) {
  if (a === b) {
    return res * a;
  }
  else if (a % 2 === 0 && b % 2 === 0) {
    return gcd(a / 2, b / 2, 2 * res);
  }
  else if (a % 2 === 0) {
    return gcd(a / 2, b, res);
  }
  else if (b % 2 === 0) {
    return gcd(a, b / 2, res);
  }
  else if (a > b) {
    return gcd(a - b, b, res);
  }
  else { // b > a
    return gcd(a, b - a, res);
  }
}