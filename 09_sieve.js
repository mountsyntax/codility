/*
 
You are given a non-empty zero-indexed array A consisting of N integers.

For each number A[i] such that 0 ≤ i < N, we want to count the number of elements of the array that are not the divisors of A[i]. We say that these elements are non-divisors.

For example, consider integer N = 5 and array A such that:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6

For the following elements:

        A[0] = 3, the non-divisors are: 2, 6,
        A[1] = 1, the non-divisors are: 3, 2, 3, 6,
        A[2] = 2, the non-divisors are: 3, 3, 6,
        A[3] = 3, the non-divisors are: 2, 6,
        A[6] = 6, there aren't any non-divisors.

Write a function:

    function solution(A); 

that, given a non-empty zero-indexed array A consisting of N integers, returns a sequence of integers representing the amount of non-divisors.

The sequence should be returned as:

        a structure Results (in C), or
        a vector of integers (in C++), or
        a record Results (in Pascal), or
        an array of integers (in any other programming language).

For example, given:

    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6

the function should return [2, 4, 3, 2, 0], as explained above.

Assume that:

        N is an integer within the range [1..50,000];
        each element of array A is an integer within the range [1..2 * N].

Complexity:

        expected worst-case time complexity is O(N*log(N));
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var output = [],
      sieve = [],
      factorCount = 0,
      factors;

  // create a sieve
  for (var i = 1; i <= A.length * 2; i++) {
    sieve[i] = 0;
  }

  for (i = 0; i < A.length; i++) {
    sieve[A[i]]++;
  }

  for (i = 0; i < A.length; i++) {
    factorCount = 0;
    factors = getFactors(A[i]);

    for (var f = 0; f < factors.length; f++) {
      factorCount += sieve[factors[f]];
    }

    output[i] = A.length - factorCount;
  }

  return output;
}

function getFactors(value) {
  var factors = [];

  for (var i = 1; i * i <= value; i++) {
    if (value % i === 0) {
      factors.push(i);

      // check to make sure this is not a square factor
      if (value / i !== i) {
        factors.push(value / i);
      }
    }
  }

  return factors;
}

/*

A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

A semiprime is a natural number that is the product of two (not necessarily distinct) prime numbers. The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

You are given two non-empty zero-indexed arrays P and Q, each consisting of M integers. These arrays represent queries about the number of semiprimes within specified ranges.

Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

For example, consider an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20

The number of semiprimes within each of these ranges is as follows:

        (1, 26) is 10,
        (4, 10) is 4,
        (16, 20) is 0.

Write a function:

    function solution(N, P, Q); 

that, given an integer N and two non-empty zero-indexed arrays P and Q consisting of M integers, returns an array consisting of M elements specifying the consecutive answers to all the queries.

For example, given an integer N = 26 and arrays P, Q such that:

    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20

the function should return the values [10, 4, 0], as explained above.

Assume that:

        N is an integer within the range [1..50,000];
        M is an integer within the range [1..30,000];
        each element of arrays P, Q is an integer within the range [1..N];
        P[i] ≤ Q[i].

Complexity:

        expected worst-case time complexity is O(N*log(log(N))+M);
        expected worst-case space complexity is O(N+M), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(N, P, Q) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var sieve = Array.apply(null, Array(N + 1)).map(function () { return 'prime'; }),
      prefixSieve = [0, 0, 0, 0], // under 4 is not a semi
      output = [];

  sieve[0] = sieve[1] = 'not';

  for (var i = 2; i * i <= N; i++) {
    if (sieve[i] === 'prime') {
      var k = i * i;
      while (k <= N) {
        sieve[k] = 'not';
        k += i;
      }
    }
  }

  for (i = 4; i <= N; i++) {
    if (sieve[i] !== 'prime' && isSemiPrime(i, sieve)) {
      sieve[i] = 'semi';
    }
  }

  for (i = 4; i <= N; i++) {
    prefixSieve[i] = prefixSieve[i - 1] + (sieve[i] === 'semi' ? 1 : 0);
  }

  for (i = 0; i < P.length; i++) {
    output[i] = prefixSieve[Q[i]] - prefixSieve[P[i] - 1];
  }

  return output;
}

function isSemiPrime(value, sieve) {
  var factors = 0;

  // start at 2 to ignore the prime factor
  for (var i = 2; i * i <= value; i++) {
    if (value % i === 0) {
      factors++;

      // check to make sure this is not a square factor
      if (value / i !== i) {
        factors++;
      }

      if (factors > 2 || sieve[i] !== 'prime' || sieve[value / i] !== 'prime') return false;
    }
  }

  return true;
}