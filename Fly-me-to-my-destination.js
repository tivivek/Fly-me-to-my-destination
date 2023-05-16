// Problem statement :)

// 'Consider there are **N** airports in the world, each airport has a plane available with limited units of fuel available to fly. 

// You are initially positioned at airport **number one** and you have to reach the last airport (**N**) by hiring a **minimum** number of planes. 
// You'd need 1 unit of fuel to fly to the nearest airport from any airport. 
// You will be given an array of N numbers each representing the units of fuel available in the plane at that particular airport. 
// Print the number of planes you'd need to hire to reach the last airport. If it is not possible to reach the last airport, return -1

// Example: 

// Array = [2,1,2,3,1]

// In the given array, there are 5 airports, the plane at the starting airport has 2 units of fuel so you can hire this plane and stop at the 2nd or 3rd airport. 
// The plane at the 2nd airport has 1 unit of fuel so it can fly to the 3rd airport only. The minimum number of planes required in this case is two 2 → 2→ 1. 

// Example 2:

// Array = [1,6,3,4,5,0,0,0,6]

// In the given array, there are 9 airports, the plane at the starting airport has 1 unit of fuel, so you can hire this plane and stop at the 2nd airport only. 
// The plane at the 2nd airport has 6 units of fuel, so it can fly to the 3rd, 4th, 5th, 6th, 7th, or 8th airport. 
// If we take the plane at the 5th airport, the minimum number of planes required in this case is three 1 → 6 → 5 → 6

Approach -1 :) 
            time-complexity O(N^2) & space-complexity O(1)

// It uses a greedy algorithm that iteratively selects the airport with the maximum reachable distance from the current airport and checks if it can reach 
// the last airport. If it can, it selects that airport as the next destination, otherwise, it continues to the next iteration with the same airport.

Solution :
          function minPlanesToReachLastAirport(fuelArr) {
            const n = fuelArr.length;
            let currentAirport = 0;
            let planes = 1; // I am assuming initially i have one plane

            while (currentAirport < n) {
                  let maxReachableDistance = 0;
                  let nextAirport = -1;

                  // Find the airport with the maximum reachable distance from the current airport
                  for (let i = currentAirport + 1; i <= Math.min(currentAirport + fuelArr[currentAirport], n - 1); i++) {
                      const reachableDistance = i + fuelArr[i];
                      if (reachableDistance > maxReachableDistance) {
                        maxReachableDistance = reachableDistance;
                        nextAirport = i;
                      }
              }

              // If no airport is reachable, return -1
              if (nextAirport === -1) {
                return -1;
              }
              // Assign currentAirport  to nextAirport 
              currentAirport = nextAirport;
              // Increment the count of planes required
              planes++;

              // If the last airport is reachable, return the number of planes required
              if (currentAirport + fuelArr[currentAirport] >= n - 1) {
                return planes;
              }
            }
            // If the last airport is not reachable, return -1
            return -1;
          }

          const fuelArr1 = [2,1,2,3,1];
          const fuelArr2 = [1,6,3,4,5,0,0,0,6];

          console.log(minPlanesToReachLastAirport(fuelArr1)); // output: 2
          console.log(minPlanesToReachLastAirport(fuelArr2)); // output: 3

// Ecplainantion :)

//     The function minPlanesToReachLastAirport takes an array fuelArr as input, representing the units of fuel available in the planes at each airport. 
//     It returns the minimum number of planes required to reach the last airport, or -1 if it's not possible to reach the last airport.

//     The algorithm iteratively selects the airport with the maximum reachable distance from the current airport and checks if it can reach the last airport. 
//     If it can, it selects that airport as the next destination, otherwise, it continues to the next iteration with the same airport.

//     The variables currentAirport and planes are used to keep track of the current airport and the number of planes required to reach that airport, respectively.

//     The algorithm then proceeds as follows:

//         While the current airport is less than n:
//         Find the airport with the maximum reachable distance from the current airport.
//         If no airport is reachable, return -1.
//         If the last airport is reachable from the selected airport, return the number of planes required to reach the last airport.
//         Otherwise, select the selected airport as the next destination and increment the number of planes required.
//         Return -1 if it's not possible to reach the last airport.

Approach -2 :)
  // It uses a dynamic programming algorithm
  // In the worst case, when all elements in fuelArr are equal to N, the time complexity will be O(N^2).
  // The space complexity of the function is O(N) because it uses an additional array dp of size N to store the minimum planes required to reach each airport.

solution : 
          function minPlanesToReachLastAirport(fuelArr) {
            const n = fuelArr.length;
            const dp = new Array(n).fill(Infinity);
            dp[0] = 0;

            for (let i = 0; i < n; i++) {
              for (let j = i + 1; j <= i + fuelArr[i] && j < n; j++) {
                dp[j] = Math.min(dp[j], dp[i] + 1);
              }
            }
            if (dp[n -1] !== Infinity) return dp[n -1];

            return -1;
          }

          const fuelArr1 = [2,1,2,3,1];
          const fuelArr2 = [1,6,3,4,5,0,0,0,6];

          console.log(minPlanesToReachLastAirport(fuelArr1)); // output: 2
          console.log(minPlanesToReachLastAirport(fuelArr2)); // output: 3

//   Ecplainantion :)
//       The algorithm uses a DP approach, where we compute the minimum number of planes required to reach each airport j, 
//       given that we have already reached some airport i with the minimum number of planes required.

//       The dp array is used to store the minimum number of planes required to reach each airport. We initialize it with Infinity, 
//       except for the starting airport (index 0), which requires 0 planes.

//       The algorithm then proceeds as follows:

//           For each airport i from 0 to n-1, we consider all possible airports j that can be reached from i using the available fuel 
//           (i.e., j >= i+1 and j <= i+fuelArr[i]), and update the minimum number of planes required to reach j using the minimum number 
//           of planes required to reach i plus one (i.e., dp[j] = Math.min(dp[j], dp[i] + 1)).
//           Return the minimum number of planes required to reach the last airport (dp[n-1]), or -1 if it's not possible to reach the last 
//            airport (i.e., dp[n-1] === Infinity).


