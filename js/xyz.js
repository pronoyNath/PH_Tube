const totalSeconds = 7200; 
const hours = Math.floor(totalSeconds / 3600);
const remainingSeconds = totalSeconds % 3600;
const minutes = Math.floor(remainingSeconds / 60);

console.log(`${totalSeconds} seconds is equal to ${hours} hours and ${minutes} minutes`);
