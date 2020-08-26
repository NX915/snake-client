const {MSG, SPEED, BOOST} = require('./constants');
let connection;
let speed = SPEED;

const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  handleUserInput(stdin);
  return stdin;
};

let keyTime = Date.now();
const handleUserInput = function(input) {
  input.on('data', (key) => {
    if (key === '\u0003') {
      process.stdout.write('Thanks for using me, ciao!\n');
      process.exit();
    } else if (MSG[key] !== undefined) {
      connection.write(`Say: ${MSG[key]}`);
    } else if (key === 'r') {
      speed -= 100;
      process.stdout.write(`Speed: ${speed / 100}\n`);
    } else if (key === 'f') {
      speed += 100;
      process.stdout.write(`Speed: ${speed / 100}\n`);
    } else if (key === 'i') {
      keyTime = Date.now();
      for (let i = 0; i < BOOST; i++) {
        setTimeout(() => {
          connection.write('Move: up');
        }, i * 10);
      }
      sendMove('w');
    } else if (key === 'j') {
      keyTime = Date.now();
      for (let i = 0; i < BOOST * 2; i++) {
        setTimeout(() => {
          connection.write('Move: left');
        }, i * 10);
      }
      sendMove('a');
    } else if (key === 'k') {
      keyTime = Date.now();
      for (let i = 0; i < BOOST; i++) {
        setTimeout(() => {
          connection.write('Move: down');
        }, i * 10);
      }
      sendMove('s');
    } else if (key === 'l') {
      keyTime = Date.now();
      for (let i = 0; i < BOOST * 2; i++) {
        setTimeout(() => {
          connection.write('Move: right');
        }, i * 10);
      }
      sendMove('d');
    } else {
      keyTime = Date.now();
      sendMove(key);
    }
  });
};

const sendMove = function(key) {
  if (key === 'w') {
    connection.write('Move: up');
  } else if (key === 'a') {
    connection.write('Move: left');
  } else if (key === 's') {
    connection.write('Move: down');
  } else if (key === 'd') {
    connection.write('Move: right');
  }
  setTimeout(() => {
    if (keyTime + speed <= Date.now()) {
      sendMove(key);
    }
  }, speed);
};

module.exports = {setupInput};