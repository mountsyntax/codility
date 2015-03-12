/*

Write a function

    function solution(A); 

that, given a zero-indexed array A consisting of N integers, returns the number of distinct values in array A.

Assume that:

        N is an integer within the range [0..100,000];
        each element of array A is an integer within the range [−1,000,000..1,000,000].

For example, given array A consisting of six elements such that:

    A[0] = 2    A[1] = 1    A[2] = 1
    A[3] = 2    A[4] = 3    A[5] = 1

the function should return 3, because there are 3 distinct values appearing in array A, namely 1, 2 and 3.

Complexity:

        expected worst-case time complexity is O(N*log(N));
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var distinct = 0,
      last;

  A = mergeSort(A);

  for (var i = 0; i < A.length; i++) {
    if (last === undefined || A[i] !== last) {
      distinct++;
      last = A[i];
    }
  }

  return distinct;
}

function mergeSort(items) {

  if (items.length < 2) {
    return items;
  }

  var middle = Math.floor(items.length / 2),
      left = items.slice(0, middle),
      right = items.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  var output = [],
      li = 0;
  ri = 0;

  while (li < left.length && ri < right.length) {
    if (left[li] < right[ri]) {
      output.push(left[li]);
      li++;
    }
    else {
      output.push(right[ri]);
      ri++;
    }
  }

  return output.concat(left.slice(li)).concat(right.slice(ri));
}

/*
 

A zero-indexed array A consisting of N integers is given. A triplet (P, Q, R) is triangular if 0 ≤ P < Q < R < N and:

        A[P] + A[Q] > A[R],
        A[Q] + A[R] > A[P],
        A[R] + A[P] > A[Q].

For example, consider array A such that:

  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 20

Triplet (0, 2, 4) is triangular.

Write a function:

    function solution(A); 

that, given a zero-indexed array A consisting of N integers, returns 1 if there exists a triangular triplet for this array and returns 0 otherwise. For example, given array A such that:

  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 20

the function should return 1, as explained above. Given array A such that:

  A[0] = 10    A[1] = 50    A[2] = 5
  A[3] = 1

the function should return 0.

Assume that:

        N is an integer within the range [0..1,000,000];
        each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

Complexity:

        expected worst-case time complexity is O(N*log(N));
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  A.sort(function (a, b) { return (a - b); });

  for (var i = 0; i < A.length - 2; i++) {
    if (((A[i] + A[i + 1]) > A[i + 2]) &&
        ((A[i] + A[i + 2]) > A[i + 1]) &&
        ((A[i + 1] + A[i + 2]) > A[i])) {
      return 1;
    }
  }

  return 0;
}

/*

A non-empty zero-indexed array A consisting of N integers is given. The product of triplet (P, Q, R) equates to A[P] * A[Q] * A[R] (0 ≤ P < Q < R < N).

For example, array A such that:

  A[0] = -3
  A[1] = 1
  A[2] = 2
  A[3] = -2
  A[4] = 5
  A[5] = 6

contains the following example triplets:

        (0, 1, 2), product is −3 * 1 * 2 = −6
        (1, 2, 4), product is 1 * 2 * 5 = 10
        (2, 4, 5), product is 2 * 5 * 6 = 60

Your goal is to find the maximal product of any triplet.

Write a function:

    function solution(A); 

that, given a non-empty zero-indexed array A, returns the value of the maximal product of any triplet.

For example, given array A such that:

  A[0] = -3
  A[1] = 1
  A[2] = 2
  A[3] = -2
  A[4] = 5
  A[5] = 6

the function should return 60, as the product of triplet (2, 4, 5) is maximal.

Assume that:

        N is an integer within the range [3..100,000];
        each element of array A is an integer within the range [−1,000..1,000].

Complexity:

        expected worst-case time complexity is O(N*log(N));
        expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var output = 0,
      length = A.length - 1;

  A.sort(function (a, b) { return (a - b); });

  output = A[length] * A[length - 1] * A[length - 2];

  if (A[1] < 0) {
    var negTest = A[0] * A[1] * A[length];

    output = Math.max(output, negTest);
  }

  return output;
}

/*

Given an array A of N integers, we draw N discs in a 2D plane such that the I-th disc is centered on (0,I) and has a radius of A[I]. We say that the J-th disc and K-th disc intersect if J ≠ K and J-th and K-th discs have at least one common point.

Write a function:

    function solution(A); 

that, given an array A describing N discs as explained above, returns the number of pairs of intersecting discs. For example, given N=6 and:

    A[0] = 1  A[1] = 5  A[2] = 2 
    A[3] = 1  A[4] = 4  A[5] = 0  

intersecting discs appear in eleven pairs of elements:

        0 and 1,
        0 and 2,
        0 and 4,
        1 and 2,
        1 and 3,
        1 and 4,
        1 and 5,
        2 and 3,
        2 and 4,
        3 and 4,
        4 and 5.

so the function should return 11.

The function should return −1 if the number of intersecting pairs exceeds 10,000,000.

Assume that:

        N is an integer within the range [0..100,000];
        each element of array A is an integer within the range [0..2147483647].

Complexity:

        expected worst-case time complexity is O(N*log(N));
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var count = 0,
      active = 0,
      mins = [],
      maxes = [],
      BREAKOUT = 10000000;

  for (var i = 0; i < A.length; i++) {
    if (i < A[i]) mins[0] = (mins[0] || 0) + 1;
    else mins[i - A[i]] = (mins[i - A[i]] || 0) + 1;

    if (i + A[i] > A.length) maxes[A.length - 1] = (maxes[A.length - 1] || 0) + 1;
    else maxes[i + A[i]] = (maxes[i + A[i]] || 0) + 1;
  }

  for (i = 0; i < A.length; i++) {
    var min = mins[i] || 0;
    var max = maxes[i] || 0;

    count += active * min + (min * (min - 1)) / 2;
    if (count > BREAKOUT) return -1;

    active += min - max;
  }

  return count;
}