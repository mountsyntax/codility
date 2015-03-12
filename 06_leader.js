/*

A zero-indexed array A consisting of N integers is given. The dominator of array A is the value that occurs in more than half of the elements of A.

For example, consider array A such that

    A[0] = 3    A[1] = 4    A[2] =  3
    A[3] = 2    A[4] = 3    A[5] = -1
    A[6] = 3    A[7] = 3

The dominator of A is 3 because it occurs in 5 out of 8 elements of A (namely in those with indices 0, 2, 4, 6 and 7) and 5 is more than a half of 8.

Write a function

    function solution(A); 

that, given a zero-indexed array A consisting of N integers, returns index of any element of array A in which the dominator of A occurs. The function should return −1 if array A does not have a dominator.

Assume that:

        N is an integer within the range [0..100,000];
        each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

For example, given array A such that

    A[0] = 3    A[1] = 4    A[2] =  3
    A[3] = 2    A[4] = 3    A[5] = -1
    A[6] = 3    A[7] = 3

the function may return 0, 2, 4, 6 or 7, as explained above.

Complexity:

        expected worst-case time complexity is O(N);
        expected worst-case space complexity is O(1), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var candidate = -Infinity,
      occurs = 0,
      output = -1;

  // find the candidate
  for (var i = 0; i < A.length; i++) {
    if (candidate === -Infinity) {
      candidate = A[i];
      occurs = 1;
    }
    else if (candidate === A[i]) {
      occurs++;
    }
    else {
      occurs--;

      if (occurs === 0) {
        candidate = -Infinity;
      }
    }
  }

  occurs = 0;
  // verify
  for (i = 0; i < A.length; i++) {
    if (candidate === A[i]) {
      if (output === -1) output = i;

      occurs++;
    }
  }

  return ((occurs / A.length) > 0.5) ? output : -1;
}

/*
 
A non-empty zero-indexed array A consisting of N integers is given.

The leader of this array is the value that occurs in more than half of the elements of A.

An equi leader is an index S such that 0 ≤ S < N − 1 and two sequences A[0], A[1], ..., A[S] and A[S + 1], A[S + 2], ..., A[N − 1] have leaders of the same value.

For example, given array A such that:

    A[0] = 4
    A[1] = 3
    A[2] = 4
    A[3] = 4
    A[4] = 4
    A[5] = 2

we can find two equi leaders:

        0, because sequences: (4) and (3, 4, 4, 4, 2) have the same leader, whose value is 4.
        2, because sequences: (4, 3, 4) and (4, 4, 2) have the same leader, whose value is 4.

The goal is to count the number of equi leaders. Write a function:

    function solution(A); 

that, given a non-empty zero-indexed array A consisting of N integers, returns the number of equi leaders.

For example, given:

    A[0] = 4
    A[1] = 3
    A[2] = 4
    A[3] = 4
    A[4] = 4
    A[5] = 2

the function should return 2, as explained above.

Assume that:

        N is an integer within the range [1..100,000];
        each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].

Complexity:

        expected worst-case time complexity is O(N);
        expected worst-case space complexity is O(N), beyond input storage (not counting the storage required for input arguments).

Elements of input arrays can be modified.

 */

function solution(A) {
  // write your code in JavaScript (ECMA-262, 5th edition)
  var candidate = -Infinity,
      occurs = 0,
      equicount = 0,
      output = 0;

  // find the candidate
  for (var i = 0; i < A.length; i++) {
    if (candidate === -Infinity) {
      candidate = A[i];
      occurs = 1;
    }
    else if (candidate === A[i]) {
      occurs++;
    }
    else {
      occurs--;

      if (occurs === 0) {
        candidate = -Infinity;
      }
    }
  }

  occurs = 0;
  // count how many times our leader occurs in total
  for (i = 0; i < A.length; i++) {
    if (A[i] === candidate) {
      occurs++;
    }
  }

  // count the equi-leader splits
  for (i = 0; i < A.length; i++) {
    if (A[i] === candidate) {
      equicount++;
    }

    if (equicount / (i + 1) > 0.5 && (occurs - equicount) / (A.length - 1 - i) > 0.5) {
      output++;
    }
  }

  return output;
}
