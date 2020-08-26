let connection;

const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  handleUserInput(stdin);
  return stdin;
};

const handleUserInput = function(input) {
  input.on('data', (key) => {
    if (key === '\u0003') {
      process.stdout.write('Thanks for using me, ciao!\n');
      process.exit();
    } else if (key === 'w') {
      connection.write('Move: up');
    } else if (key === 'a') {
      connection.write('Move: left');
    } else if (key === 's') {
      connection.write('Move: down');
    } else if (key === 'd') {
      connection.write('Move: right');
    } else if (key === 'c') {
      connection.write('Say: Watch it!');
    }
  });
};

module.exports = {setupInput};