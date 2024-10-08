const decodeTheRing = function (s, p) {

  const memo = {};  // to store the results of subproblems

  // Recursive helper function
  const helper = function (sIdx, pIdx) {
      // Memoization: return cached results if available
      const key = `${sIdx}-${pIdx}`;
      if (key in memo) {
          return memo[key];
      }

      // Base case: if both the message and pattern are fully consumed, it's a match
      if (sIdx === s.length && pIdx === p.length) {
          return true;
      }

      // If pattern is fully consumed but the message is not, it's not a match
      if (pIdx === p.length) {
          return false;
      }

      // Handle '*' in the pattern
      if (p[pIdx] === '*') {
          // '*' can match zero characters (move to the next pattern) or
          // '*' can match one or more characters (move to the next character in the message)
          const matchZeroChars = helper(sIdx, pIdx + 1);  // '*' matches zero characters
          const matchOneOrMoreChars = sIdx < s.length && helper(sIdx + 1, pIdx);  // '*' matches one character
          memo[key] = matchZeroChars || matchOneOrMoreChars;
          return memo[key];
      }

      // Handle '?' in the pattern (matches exactly one character if available)
      if (p[pIdx] === '?') {
          if (sIdx < s.length && helper(sIdx + 1, pIdx + 1)) {
              memo[key] = true;
              return true;
          }
      }

      // Handle direct character match
      if (sIdx < s.length && p[pIdx] === s[sIdx]) {
          memo[key] = helper(sIdx + 1, pIdx + 1);
          return memo[key];
      }

      // If no condition matched, return false
      memo[key] = false;
      return false;
  };

  // Start recursive helper function from the beginning of both message and pattern
  return helper(0, 0);

  };
  
  module.exports = decodeTheRing;