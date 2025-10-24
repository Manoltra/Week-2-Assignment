let userName = 'Guest';

function setUserName(name) {
  userName = name || 'Guest';
}

function getUserName() {
  return userName;
}

function getRandomName() {
  const randomNames = ['Ash', 'Misty', 'Brock', 'Gary', 'Dawn', 'May', 'Serena', 'Cynthia', 'Red', 'Blue'];
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}

module.exports = { setUserName, getUserName, getRandomName };