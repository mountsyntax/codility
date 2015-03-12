/*

A non-empty zero-indexed array A consisting of N integers is given. The consecutive elements of array A represent consecutive cars on a road.

Array A contains only 0s and/or 1s:

  0 represents a car traveling east,
  1 represents a car traveling west.

The goal is to count passing cars. We say that a pair of cars (P, Q), where 0 ≤ P < Q < N, is passing when P is traveling to the east and Q is traveling to the west.

For example, consider array A such that:

  A[0] = 0
A[1] = 1
A[2] = 0
A[3] = 1
A[4] = 1

We have five pairs of passing cars: (0, 1), (0, 3), (0, 4), (2, 3), (2, 4).

Write a function:

    function solution(A); 

      that, given a non-empty zero-indexed array A of N integers, returns the number of passing cars.

      The function should return −1 if the number of passing cars exceeds 1,000,000,000.

      For example, given:

        A[0] = 0
        A[1] = 1
        A[2] = 0
        A[3] = 1
        A[4] = 1

      the function should return 5, as explained above.

      Assume that:

              N is an integer within the range [1..100,000];
              each element of array A is an integer that can have one of the following values: 0, 1.

          Complexity:

              expected worst-case time complexity is O(N);
        expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).

      Elements of input arrays can be modified.
*/

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var eastBound = 0,
      passes = 0,
      BREAKOUT = 1000000000;

  for (var i = 0; i < A.length; i++) {
    if (A[i]) {
      passes += eastBound;
    }
    else {
      eastBound++;
    }

    if (passes > BREAKOUT) return -1;
  }

  return passes;
}

/*

A DNA sequence can be represented as a string consisting of the letters A, C, G and T, which correspond to the types of successive nucleotides in the sequence. Each nucleotide has an impact factor, which is an integer. Nucleotides of types A, C, G and T have impact factors of 1, 2, 3 and 4, respectively. You are going to answer several queries of the form: What is the minimal impact factor of nucleotides contained in a particular part of the given DNA sequence?

The DNA sequence is given as a non-empty string S = S[0]S[1]...S[N-1] consisting of N characters. There are M queries, which are given in non-empty arrays P and Q, each consisting of M integers. The K-th query (0 ≤ K < M) requires you to find the minimal impact factor of nucleotides contained in the DNA sequence between positions P[K] and Q[K] (inclusive).

For example, consider string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6

The answers to these M = 3 queries are as follows:

        The part of the DNA between positions 2 and 4 contains nucleotides G and C (twice), whose impact factors are 3 and 2 respectively, so the answer is 2.
        The part between positions 5 and 5 contains a single nucleotide T, whose impact factor is 4, so the answer is 4.
        The part between positions 0 and 6 (the whole string) contains all nucleotides, in particular nucleotide A whose impact factor is 1, so the answer is 1.

Write a function:

    function solution(S, P, Q); 

that, given a non-empty zero-indexed string S consisting of N characters and two non-empty zero-indexed arrays P and Q consisting of M integers, returns an array consisting of M integers specifying the consecutive answers to all queries.

The sequence should be returned as:

        a Results structure (in C), or
        a vector of integers (in C++), or
        a Results record (in Pascal), or
        an array of integers (in any other programming language).

For example, given the string S = CAGCCTA and arrays P, Q such that:

    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6

the function should return the values [2, 4, 1], as explained above.

Assume that:

        N is an integer within the range [1..100,000];
        M is an integer within the range [1..50,000];
        each element of arrays P, Q is an integer within the range [0..N − 1];
        P[K] ≤ Q[K], where 0 ≤ K < M;
        string S consists only of upper-case English letters A, C, G, T.

Complexity:

        expected worst-case time complexity is O(N+M);
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

*/

function solution(S, P, Q) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var output = [],
      countedGenes = [],
      impacts = {
        'A': 1,
        'C': 2,
        'G': 3,
        'T': 4
      },
      topArray,
      bottomArray;

  // pre-count all the occurrences
  for (var i = 0; i < S.length; i++) {
    if (i === 0) {
      countedGenes[i] = [0, 0, 0, 0];
    }
    else {
      countedGenes[i] = countedGenes[i - 1].slice();
    }

    countedGenes[i][impacts[S.charAt(i)] - 1] += 1;
  }

  // use a simple diff to see which numbers have changed
  for (var index = 0; index < P.length; index++) {
    topArray = countedGenes[Q[index]];

    if (P[index] === 0) {
      bottomArray = [0, 0, 0, 0];
    }
    else {
      bottomArray = countedGenes[P[index] - 1];
    }

    if ((topArray[0] - bottomArray[0]) > 0) {
      output.push(1);
    }
    else if ((topArray[1] - bottomArray[1]) > 0) {
      output.push(2);
    }
    else if ((topArray[2] - bottomArray[2]) > 0) {
      output.push(3);
    }
    else {
      output.push(4);
    }
  }

  return output;
}

/*

A non-empty zero-indexed array A consisting of N integers is given. A pair of integers (P, Q), such that 0 ≤ P < Q < N, is called a slice of array A (notice that the slice contains at least two elements). The average of a slice (P, Q) is the sum of A[P] + A[P + 1] + ... + A[Q] divided by the length of the slice. To be precise, the average equals (A[P] + A[P + 1] + ... + A[Q]) / (Q − P + 1).

For example, array A such that:

    A[0] = 4
    A[1] = 2
    A[2] = 2
    A[3] = 5
    A[4] = 1
    A[5] = 5
    A[6] = 8

contains the following example slices:

        slice (1, 2), whose average is (2 + 2) / 2 = 2;
        slice (3, 4), whose average is (5 + 1) / 2 = 3;
        slice (1, 4), whose average is (2 + 2 + 5 + 1) / 4 = 2.5.

The goal is to find the starting position of a slice whose average is minimal.

Write a function:

    function solution(A); 

that, given a non-empty zero-indexed array A consisting of N integers, returns the starting position of the slice with the minimal average. If there is more than one slice with a minimal average, you should return the smallest starting position of such a slice.

For example, given array A such that:

    A[0] = 4
    A[1] = 2
    A[2] = 2
    A[3] = 5
    A[4] = 1
    A[5] = 5
    A[6] = 8

the function should return 1, as explained above.

Assume that:

        N is an integer within the range [2..100,000];
        each element of array A is an integer within the range [−10,000..10,000].

Complexity:

        expected worst-case time complexity is O(N);
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

*/

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)

  var sums = [0],
      min = Infinity,
      output = 0,
      average2,
      average3;

  for (var i = 1; i < A.length + 1; i++) {
    sums[i] = sums[i - 1] + A[i - 1];
  }

  for (i = 0; i < sums.length - 2; i++) {
    average2 = (sums[i + 2] - sums[i]) / 2;

    if (i + 3 < sums.length) {
      average3 = (sums[i + 3] - sums[i]) / 3;

      average2 = Math.min(average2, average3);
    }

    if (average2 < min) {
      min = average2;
      output = i;
    }
  }

  return output;
}

/*

Write a function:

    function solution(A, B, K); 

that, given three integers A, B and K, returns the number of integers within the range [A..B] that are divisible by K, i.e.:

    { i : A ≤ i ≤ B, i mod K = 0 }

For example, for A = 6, B = 11 and K = 2, your function should return 3, because there are three numbers divisible by 2 within the range [6..11], namely 6, 8 and 10.

Assume that:

        A and B are integers within the range [0..2,000,000,000];
        K is an integer within the range [1..2,000,000,000];
        A ≤ B.

Complexity:

        expected worst-case time complexity is O(1);
        expected worst-case space complexity is O(1).

*/

function solution(A, B, K) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var output = 0,
      difference = B - A;

  if (A % K === 0 || B % K === 0) output++;

  if (A < K && B >= K) difference = B;

  output += Math.floor(difference / K);

  return output;
}