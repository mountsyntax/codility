/*

You are given integers K, M and a non-empty zero-indexed array A consisting of N integers. Every element of the array is not greater than M.

You should divide this array into K blocks of consecutive elements. The size of the block is any integer between 0 and N. Every element of the array should belong to some block.

The sum of the block from X to Y equals A[X] + A[X + 1] + ... + A[Y]. The sum of empty block equals 0.

The large sum is the maximal sum of any block.

For example, you are given integers K = 3, M = 5 and array A such that:

  A[0] = 2
A[1] = 1
A[2] = 5
A[3] = 1
A[4] = 2
A[5] = 2
A[6] = 2

The array can be divided, for example, into the following blocks:

  [2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
[2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
[2, 1, 5], [], [1, 2, 2, 2] with a large sum of 8;
[2, 1], [5, 1], [2, 2, 2] with a large sum of 6.

The goal is to minimize the large sum. In the above example, 6 is the minimal large sum.

Write a function:

    function solution(K, M, A); 

      that, given integers K, M and a non-empty zero-indexed array A consisting of N integers, returns the minimal large sum.

      For example, given K = 3, M = 5 and array A such that:

        A[0] = 2
      A[1] = 1
      A[2] = 5
      A[3] = 1
      A[4] = 2
      A[5] = 2
      A[6] = 2

      the function should return 6, as explained above. Assume that:

              N and K are integers within the range [1..100,000];
              M is an integer within the range [0..10,000];
              each element of array A is an integer within the range [0..M].

        Complexity:

              expected worst-case time complexity is O(N*log(N+M));
        expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).

      Elements of input arrays can be modified.

 */

// Note M is a red herring and a waste of time
function solution(K, M, A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var blocksRequired = 0,
      result = 0,
      lowerBound = max(A),
      upperBound = sum(A),
      midBound;

  if (K === 1) { return upperBound; }
  else if (K >= A.length) { return lowerBound; }

  while (lowerBound <= upperBound) {
    midBound = Math.round((lowerBound + upperBound) / 2);
    blocksRequired = countBlocks(A, midBound);

    if (blocksRequired <= K) {
      upperBound = midBound - 1;
      result = midBound;
    }
    else {
      lowerBound = midBound + 1;
    }
  }

  return result;
}

function countBlocks(A, maxSize) {
  var blocksRequired = 1,
      blockSum = A[0];

  for (var i = 1; i < A.length; i++) {
    if (blockSum + A[i] > maxSize) {
      blockSum = A[i];
      blocksRequired++;
    }
    else {
      blockSum += A[i];
    }
  }

  return blocksRequired;
}

function sum(A) {
  var arraySum = 0;

  for (var i = 0; i < A.length; i++) {
    arraySum += A[i];
  }

  return arraySum;
}

function max(A) {
  var arrayMax = A[0];

  for (var i = 1; i < A.length; i++) {
    arrayMax = Math.max(arrayMax, A[i]);
  }

  return arrayMax;
}

/*

You are given two non-empty zero-indexed arrays A and B consisting of N integers. These arrays represent N planks. More precisely, A[K] is the start and B[K] the end of the K−th plank.

Next, you are given a non-empty zero-indexed array C consisting of M integers. This array represents M nails. More precisely, C[I] is the position where you can hammer in the I−th nail.

We say that a plank (A[K], B[K]) is nailed if there exists a nail C[I] such that A[K] ≤ C[I] ≤ B[K].

The goal is to find the minimum number of nails that must be used until all the planks are nailed. In other words, you should find a value J such that all planks will be nailed after using only the first J nails. More precisely, for every plank (A[K], B[K]) such that 0 ≤ K < N, there should exist a nail C[I] such that I < J and A[K] ≤ C[I] ≤ B[K].

For example, given arrays A, B such that:

    A[0] = 1    B[0] = 4
    A[1] = 4    B[1] = 5
    A[2] = 5    B[2] = 9
    A[3] = 8    B[3] = 10

four planks are represented: [1, 4], [4, 5], [5, 9] and [8, 10].

Given array C such that:

    C[0] = 4
    C[1] = 6
    C[2] = 7
    C[3] = 10
    C[4] = 2

if we use the following nails:

        0, then planks [1, 4] and [4, 5] will both be nailed.
        0, 1, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
        0, 1, 2, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
        0, 1, 2, 3, then all the planks will be nailed.

Thus, four is the minimum number of nails that, used sequentially, allow all the planks to be nailed.

Write a function:

    function solution(A, B, C); 

that, given two non-empty zero-indexed arrays A and B consisting of N integers and a non-empty zero-indexed array C consisting of M integers, returns the minimum number of nails that, used sequentially, allow all the planks to be nailed.

If it is not possible to nail all the planks, the function should return −1.

For example, given arrays A, B, C such that:

    A[0] = 1    B[0] = 4
    A[1] = 4    B[1] = 5
    A[2] = 5    B[2] = 9
    A[3] = 8    B[3] = 10
    
    C[0] = 4
    C[1] = 6
    C[2] = 7
    C[3] = 10
    C[4] = 2

the function should return 4, as explained above.

Assume that:

        N and M are integers within the range [1..30,000];
        each element of arrays A, B, C is an integer within the range [1..2*M];
        A[K] ≤ B[K].

Complexity:

        expected worst-case time complexity is O((N+M)*log(M));
        expected worst-case space complexity is O(M), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A, B, C) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var result = -1;

  for (var i = 0; i < C.length; i++) {
    C[i] = { 'index': i, 'location': C[i] };
  }

  C = C.sort(function (a, b) { return a.location - b.location; });

  for (i = 0; i < A.length; i++) {
    result = findNail(A[i], B[i], C, result);

    if (result === -1) {
      return -1;
    }
  }

  return result + 1;
}

function findNail(plankStart, plankEnd, nails, previousResult) {
  var result = -1,
      resultPosition = -1,
      nailLower = 0,
      nailUpper = nails.length - 1,
      nailMid = 0,
      nailPosition;

  while (nailLower <= nailUpper) {
    nailMid = Math.round((nailLower + nailUpper) / 2);
    nailPosition = nails[nailMid].location;

    if (nailPosition < plankStart) {
      nailLower = nailMid + 1;
    }
    else if (nailPosition > plankEnd) {
      nailUpper = nailMid - 1;
    }
    else {
      nailUpper = nailMid - 1;
      result = nails[nailMid].index;
      resultPosition = nailMid;
    }
  }

  if (result === -1) return result;

  for (var i = resultPosition + 1; i < nails.length; i++) {
    if (nails[i].location > plankEnd) {
      break;
    }

    result = Math.min(result, nails[i].index);

    if (previousResult > result) {
      return previousResult;
    }
  }

  return Math.max(result, previousResult);
}