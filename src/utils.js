// Define arrays of possible first names and last names
const firstNames = ['Alices', 'Bober', 'Charli', 'Dave', 'Evee', 'Frankie'];
const lastNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Davis', 'Wilson'];

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random name
export const generateRandomName = () => {
  const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
  const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  return `${firstName}_${lastName}`;
}