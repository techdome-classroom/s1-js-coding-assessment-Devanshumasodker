const decodeTheRing = function (s, p) {

  const memo = {};

  const helper = function (sIdx, pIdx) {
      const key = `${sIdx}-${pIdx}`;
      if (key in memo) {
          return memo[key];
      }

      if (sIdx === s.length && pIdx === p.length) {
          return true;
      }

      if (pIdx === p.length) {
          return false;
      }

      if (p[pIdx] === '*') {
          const matchZeroChars = helper(sIdx, pIdx + 1);
          const matchOneOrMoreChars = sIdx < s.length && helper(sIdx + 1, pIdx);
          memo[key] = matchZeroChars || matchOneOrMoreChars;
          return memo[key];
      }

      if (p[pIdx] === '?') {
        if (sIdx < s.length && helper(sIdx + 1, pIdx + 1)) {
            memo[key] = true;
            return true;
        }
    }

      if (sIdx < s.length && p[pIdx] === s[sIdx]) {
        memo[key] = helper(sIdx + 1, pIdx + 1);
        return memo[key];
    }

      memo[key] = false;
      return false;
  };

  return helper(0, 0);
  

  };
  
  module.exports = decodeTheRing;