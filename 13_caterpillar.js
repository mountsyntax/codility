/* 

A non-empty zero-indexed array A consisting of N numbers is given. The array is sorted in non-decreasing order. The absolute distinct count of this array is the number of distinct absolute values among the elements of the array.

For example, consider array A such that:

  A[0] = -5    
  A[1] = -3    
  A[2] = -1
  A[3] =  0    
  A[4] =  3    
  A[5] =  6

The absolute distinct count of this array is 5, because there are 5 distinct absolute values among the elements of this array, namely 0, 1, 3, 5 and 6.

Write a function:

    function solution(A); 

that, given a non-empty zero-indexed array A consisting of N numbers, returns absolute distinct count of array A.

For example, given array A such that:

  A[0] = -5    
  A[1] = -3    
  A[2] = -1
  A[3] =  0    
  A[4] =  3    
  A[5] =  6

the function should return 5, as explained above.

Assume that:

        N is an integer within the range [1..100,000];
        each element of array A is an integer within the range [−2,147,483,648..2,147,483,647];
        array A is sorted in non-decreasing order.

Complexity:

        expected worst-case time complexity is O(N);
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var head = 0,
      tail = A.length - 1,
      current = Math.max(Math.abs(A[head]), Math.abs(A[tail])),
      former,
      latter,
      count = 1;

  while (head <= tail) {
    former = Math.abs(A[head]);

    if (former === current) {
      head++;
      continue;
    }

    latter = Math.abs(A[tail]);
    if (latter === current) {
      tail--;
      continue;
    }

    if (former >= latter) {
      current = former;
      head++;
    }
    else {
      current = latter;
      tail--;
    }

    count++;
  }

  return count;
}

/*

An integer M and a non-empty zero-indexed array A consisting of N non-negative integers are given. All integers in array A are less than or equal to M.

A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The slice consists of the elements A[P], A[P + 1], ..., A[Q]. A distinct slice is a slice consisting of only unique numbers. That is, no individual number occurs more than once in the slice.

For example, consider integer M = 6 and array A such that:

    A[0] = 3
    A[1] = 4
    A[2] = 5
    A[3] = 5
    A[4] = 2

There are exactly nine distinct slices: (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2), (3, 3), (3, 4) and (4, 4).

The goal is to calculate the number of distinct slices.

Write a function:

    function solution(M, A); 

that, given an integer M and a non-empty zero-indexed array A consisting of N integers, returns the number of distinct slices.

If the number of distinct slices is greater than 1,000,000,000, the function should return 1,000,000,000.

For example, given integer M = 6 and array A such that:

    A[0] = 3
    A[1] = 4
    A[2] = 5
    A[3] = 5
    A[4] = 2

the function should return 9, as explained above.

Assume that:

        N is an integer within the range [1..100,000];
        M is an integer within the range [0..100,000];
        each element of array A is an integer within the range [0..M].

Complexity:

        expected worst-case time complexity is O(N);
        expected worst-case space complexity is O(M), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(M, A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var instanceCounter = Array.apply(null, Array(M + 1)).map(function () { return -1; }),
      distinctSlices = 0,
      tail = 0,
      newTail,
      BREAKOUT = 1000000000;

  for (var i = 0; i < A.length; i++) {
    if (instanceCounter[A[i]] !== -1 && instanceCounter[A[i]] >= tail) { // we have a duplicate
      // find the next block after the dupe
      newTail = instanceCounter[A[i]] + 1;

      // count the different Slices up to the newTail
      distinctSlices += Math.floor((newTail - tail) * (2 * i - tail - newTail - 1) / 2);

      // reset the tail
      tail = newTail;
    }

    instanceCounter[A[i]] = i;
    distinctSlices++;

    if (distinctSlices > BREAKOUT) {
      return BREAKOUT;
    }
  }

  distinctSlices += Math.floor((A.length - tail - 1) * (A.length - tail) / 2);

  return Math.min(distinctSlices, BREAKOUT);
}


/*

A zero-indexed array A consisting of N integers is given. A triplet (P, Q, R) is triangular if it is possible to build a triangle with sides of lengths A[P], A[Q] and A[R]. In other words, triplet (P, Q, R) is triangular if 0 ≤ P < Q < R < N and:

        A[P] + A[Q] > A[R],
        A[Q] + A[R] > A[P],
        A[R] + A[P] > A[Q].

For example, consider array A such that:

  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 12

There are four triangular triplets that can be constructed from elements of this array, namely (0, 2, 4), (0, 2, 5), (0, 4, 5), and (2, 4, 5).

Write a function:

    function solution(A); 

that, given a zero-indexed array A consisting of N integers, returns the number of triangular triplets in this array.

For example, given array A such that:

  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 12

the function should return 4, as explained above.

Assume that:

        N is an integer within the range [0..1,000];
        each element of array A is an integer within the range [1..1,000,000,000].

Complexity:

        expected worst-case time complexity is O(N2);
        expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var count = 0,
      z = 0;

  A.sort(function (a, b) { return (a - b); });

  for (var x = 0; x < A.length - 2; x++) {
    z = 0;
    for (var y = x + 1; y < A.length; y++) {
      while (z < A.length &&
          ((A[x] + A[y]) > A[z])) {
        z++;
      }

      count += z - y - 1;
    }
  }

  return count;
}

/*

Let A be a non-empty zero-indexed array consisting of N integers.

The abs sum of two for a pair of indices (P, Q) is the absolute value |A[P] + A[Q]|, for 0 ≤ P ≤ Q < N.

For example, the following array A:

  A[0] =  1  
  A[1] =  4 
  A[2] = -3

has pairs of indices (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2).
The abs sum of two for the pair (0, 0) is A[0] + A[0] = |1 + 1| = 2.
The abs sum of two for the pair (0, 1) is A[0] + A[1] = |1 + 4| = 5.
The abs sum of two for the pair (0, 2) is A[0] + A[2] = |1 + (−3)| = 2.
The abs sum of two for the pair (1, 1) is A[1] + A[1] = |4 + 4| = 8.
The abs sum of two for the pair (1, 2) is A[1] + A[2] = |4 + (−3)| = 1.
The abs sum of two for the pair (2, 2) is A[2] + A[2] = |(−3) + (−3)| = 6.

Write a function:

    function solution(A); 

that, given a non-empty zero-indexed array A consisting of N integers, returns the minimal abs sum of two for any pair of indices in this array.

For example, given the following array A:

  A[0] =  1 
  A[1] =  4  
  A[2] = -3

the function should return 1, as explained above.

Given array A:

  A[0] = -8  
  A[1] =  4  
  A[2] =  5   
  A[3] =-10  
  A[4] =  3

the function should return |(−8) + 5| = 3.

Assume that:

        N is an integer within the range [1..100,000];
        each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].

Complexity:

        expected worst-case time complexity is O(N*log(N));
        expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var minSum = Infinity,
      tail = 0,
      head = A.length - 1,
      testSum;

  A.sort(function (a, b) { return a - b });

  if (A[tail] >= 0) return Math.abs(A[tail] + A[tail]); // all pos
  if (A[head] <= 0) return Math.abs(A[head] + A[head]); // all neg

  while (tail <= head) {
    testSum = Math.abs(A[tail] + A[head]);

    minSum = Math.min(minSum, testSum);

    if (Math.abs(A[tail + 1] + A[head]) <= testSum) {
      tail++;
    }
    else if (Math.abs(A[tail] + A[head - 1]) <= testSum) {
      head--;
    }
    else {
      tail++;
      head--;
    }
  }

  return minSum;
}