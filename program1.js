const getTotalIsles = function (grid) {


  const dfs = function(grid, i, j, visited) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === 'W' || visited[i][j]) {
        return;
    }
    
    visited[i][j] = true;
    
    dfs(grid, i + 1, j, visited);  
    dfs(grid, i - 1, j, visited);  
    dfs(grid, i, j + 1, visited);  
    dfs(grid, i, j - 1, visited);  
};

if (!grid || grid.length === 0) {
  return 0;
}

const rows = grid.length;
const cols = grid[0].length;
const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
let islandCount = 0;

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (grid[i][j] === 'L' && !visited[i][j]) {
            dfs(grid, i, j, visited);
            islandCount++;
        }
    }
}

return islandCount;

};

module.exports = getTotalIsles;