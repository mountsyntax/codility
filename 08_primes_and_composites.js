/*
 
An integer N is given, representing the area of some rectangle.

The area of a rectangle whose sides are of length A and B is A * B, and the perimeter is 2 * (A + B).

The goal is to find the minimal perimeter of any rectangle whose area equals N. The sides of this rectangle should be only integers.

For example, given integer N = 30, rectangles of area 30 are:

        (1, 30), with a perimeter of 62,
        (2, 15), with a perimeter of 34,
        (3, 10), with a perimeter of 26,
        (5, 6), with a perimeter of 22.

Write a function:

    function solution(N); 

that, given an integer N, returns the minimal perimeter of any rectangle whose area is exactly equal to N.

For example, given an integer N = 30, the function should return 22, as explained above.

Assume that:

        N is an integer within the range [1..1,000,000,000].

Complexity:

        expected worst-case time complexity is O(sqrt(N));
        expected worst-case space complexity is O(1).


 */

function solution(N) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var perimeter = Infinity,
      factor = 0;

  for (var i = 1; i * i <= N; i++) {
    if (N % i === 0) {
      factor = N / i;

      perimeter = Math.min((i * 2 + factor * 2), perimeter);
    }
  }

  return perimeter;
}

/*
 
A positive integer D is a factor of a positive integer N if there exists an integer M such that N = D * M.

For example, 6 is a factor of 24, because M = 4 satisfies the above condition (24 = 6 * 4).

Write a function:

    function solution(N); 

that, given a positive integer N, returns the number of its factors.

For example, given N = 24, the function should return 8, because 24 has 8 factors, namely 1, 2, 3, 4, 6, 8, 12, 24. There are no other factors of 24.

Assume that:

        N is an integer within the range [1..2,147,483,647].

Complexity:

        expected worst-case time complexity is O(sqrt(N));
        expected worst-case space complexity is O(1).


 */

function solution(N) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var factors = 0;

  for (var i = 1; i * i <= N; i++) {
    if (N % i === 0) {
      factors++;

      // check to make sure this is not a square factor
      if (N / i !== i) {
        factors++;
      }
    }
  }

  return factors;
}

/*
 

A non-empty zero-indexed array A consisting of N integers is given.

A peak is an array element which is larger than its neighbors. More precisely, it is an index P such that 0 < P < N − 1,  A[P − 1] < A[P] and A[P] > A[P + 1].

For example, the following array A:

    A[0] = 1
    A[1] = 2
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2

has exactly three peaks: 3, 5, 10.

We want to divide this array into blocks containing the same number of elements. More precisely, we want to choose a number K that will yield the following blocks:

        A[0], A[1], ..., A[K − 1],
        A[K], A[K + 1], ..., A[2K − 1],
        ...
        A[N − K], A[N − K + 1], ..., A[N − 1].

What's more, every block should contain at least one peak. Notice that extreme elements of the blocks (for example A[K − 1] or A[K]) can also be peaks, but only if they have both neighbors (including one in an adjacent blocks).

The goal is to find the maximum number of blocks into which the array A can be divided.

Array A can be divided into blocks as follows:

        one block (1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2). This block contains three peaks.
        two blocks (1, 2, 3, 4, 3, 4) and (1, 2, 3, 4, 6, 2). Every block has a peak.
        three blocks (1, 2, 3, 4), (3, 4, 1, 2), (3, 4, 6, 2). Every block has a peak. Notice in particular that the first block (1, 2, 3, 4) has a peak at A[3], because A[2] < A[3] > A[4], even though A[4] is in the adjacent block.

However, array A cannot be divided into four blocks, (1, 2, 3), (4, 3, 4), (1, 2, 3) and (4, 6, 2), because the (1, 2, 3) blocks do not contain a peak. Notice in particular that the (4, 3, 4) block contains two peaks: A[3] and A[5].

The maximum number of blocks that array A can be divided into is three.

Write a function:

    function solution(A); 

that, given a non-empty zero-indexed array A consisting of N integers, returns the maximum number of blocks into which A can be divided.

If A cannot be divided into some number of blocks, the function should return 0.

For example, given:

    A[0] = 1
    A[1] = 2 
    A[2] = 3 
    A[3] = 4 
    A[4] = 3 
    A[5] = 4 
    A[6] = 1 
    A[7] = 2 
    A[8] = 3 
    A[9] = 4 
    A[10] = 6 
    A[11] = 2

the function should return 3, as explained above.

Assume that:

        N is an integer within the range [1..100,000];
        each element of array A is an integer within the range [0..1,000,000,000].

Complexity:

        expected worst-case time complexity is O(N*log(log(N)));
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */


function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var peaks = [0];

  if (A.length < 3) return 0;

  for (var i = 1; i < A.length; i++) {
    peaks[i] = peaks[i - 1];

    if (A[i - 1] < A[i] && A[i] > A[i === A.length ? i : i + 1]) {
      peaks[i] = i;
    }
  }

  for (var candidate = 3; candidate <= A.length; candidate++) {
    if (A.length % candidate !== 0) {
      continue;
    }

    var cutIndex = candidate;

    while (cutIndex !== A.length) {
      if (peaks[cutIndex - 1] === peaks[cutIndex === candidate ? 0 : cutIndex - 1 - candidate]) {
        break;
      }

      cutIndex += candidate;
    }

    if (cutIndex === peaks.length && peaks[cutIndex - 1] !== peaks[candidate === peaks.length ? 0 : cutIndex - 1 - candidate]) {
      return A.length / candidate;
    }
  }

  return 0;
}

/*
A non-empty zero-indexed array A consisting of N integers is given. A peak is an array element which is larger than its neighbours. More precisely, it is an index P such that 0 < P < N − 1 and A[P − 1] < A[P] > A[P + 1].

For example, the following array A:

    A[0] = 1 
    A[1] = 5 
    A[2] = 3 
    A[3] = 4 
    A[4] = 3 
    A[5] = 4 
    A[6] = 1 
    A[7] = 2 
    A[8] = 3 
    A[9] = 4 
    A[10] = 6 
    A[11] = 2

has exactly four peaks: elements 1, 3, 5 and 10.

You are going on a trip to a range of mountains whose relative heights are represented by array A, as shown in a figure below. You have to choose how many flags you should take with you. The goal is to set the maximum number of flags on the peaks, according to certain rules.

Flags can only be set on peaks. What's more, if you take K flags, then the distance between any two flags should be greater than or equal to K. The distance between indices P and Q is the absolute value |P − Q|.

For example, given the mountain range represented by array A, above, with N = 12, if you take:

        two flags, you can set them on peaks 1 and 5;
        three flags, you can set them on peaks 1, 5 and 10;
        four flags, you can set only three flags, on peaks 1, 5 and 10.

You can therefore set a maximum of three flags in this case.

Write a function:

    function solution(A); 

that, given a non-empty zero-indexed array A of N integers, returns the maximum number of flags that can be set on the peaks of the array.

For example, the following array A:

    A[0] = 1 
    A[1] = 5 
    A[2] = 3 
    A[3] = 4 
    A[4] = 3 
    A[5] = 4 
    A[6] = 1 
    A[7] = 2 
    A[8] = 3 
    A[9] = 4 
    A[10] = 6 
    A[11] = 2

the function should return 3, as explained above.

Assume that:

        N is an integer within the range [1..200,000];
        each element of array A is an integer within the range [0..1,000,000,000].

Complexity:

        expected worst-case time complexity is O(N);
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).


 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  if (A.length < 3) return 0;

  var peaks = [],
      peaksAccepted = 1,
      lastAccepted = 0,
      maxFlags = Math.floor(Math.sqrt(A.length)) + 1;

  for (var i = 1; i < A.length; i++) {
    if (A[i - 1] < A[i] && A[i] > A[i === A.length ? i : i + 1]) {
      peaks.push(i);
    }
  }

  maxFlags = Math.min(maxFlags, peaks.length);

  for (var candidate = maxFlags; candidate > 0; candidate--) {
    peaksAccepted = 1;
    lastAccepted = 0;

    for (i = 1; i < peaks.length; i++) {
      if (peaks[i] - peaks[i - 1] >= candidate ||
          peaks[i] - peaks[lastAccepted] >= candidate) {
        peaksAccepted++;
        lastAccepted = i;
      }

      if (peaksAccepted === candidate) break;
    }

    if (peaksAccepted >= candidate) return candidate;
  }

  return 0;
}