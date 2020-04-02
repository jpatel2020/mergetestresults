Script will merge the browser level test results (JSON formatted) found in ./results and write merged results out to ./results/merge-results

Assumptions: 
1. Structure of the browser level test results is as defined in examples 
2. Number of total tests across all files isn't in the 100s - Millions range

How to run 
1. Pull down repo 
2. In root of local project directory run: npm install --save-dev 
3. In root of local project directory run: node mergetestresults.js

Aggregated results will be located in ./results/merged-results  
