const fs = require('fs');

if (process.argv.length < 3) {
  console.error("Usage: node pets.js [read | create | update | destroy]")
  process.exit(1)
}
// console.log(process.argv);
switch (process.argv[2]) {
  case "read":
    fs.readFile("pets.json", "utf8", (err, data) => {
      if (err) throw err;
      if (process.argv[3]) {
        return console.log(JSON.parse(data)[process.argv[3]]);
      }
      console.log(JSON.parse(data));
    })
    break;
  case "create":
    // console.log(process.argv)
    if (process.argv.length < 6) {
      console.error("Usage: node pets.js create AGE KIND NAME")
      process.exit(1)
    }

    fs.readFile("./pets.json", "utf8", (err, data) => {
      if (err) throw err;
      var petObj = {
        "age": Number(process.argv[3]),
        "kind": process.argv[4],
        "name": process.argv[5]
      };
      data = JSON.parse(data)
      data.push(petObj)
      data = JSON.stringify(data)
      fs.writeFile('./pets.json', data, (err) => {
        if (err) {
          console.error('Usage: node pets.js create AGE KIND NAME');
          process.exit(1);
        };
        console.log(petObj)
      })
    })
    break;
    case "update":
    if (process.argv.length<7){
      console.error("Usage: node pets.js update INDEX AGE KIND NAME")
      process.exit(1)
    }
    fs.readFile("./pets.json", "utf8", (err, data) => {
      if (err) throw err;
      var petObj = {
        "age": Number(process.argv[4]),
        "kind": process.argv[5],
        "name": process.argv[6]
      };
      data = JSON.parse(data)
      data[process.argv[3]]=(petObj)
      data = JSON.stringify(data)
      fs.writeFile('./pets.json', data, (err) => {
        if (err) {
          console.error('Usage: node pets.js create AGE KIND NAME');
          process.exit(1);
        };
        console.log(petObj)
      })
    })
    break;
    case "destroy":
    if (process.argv.length<4){
      console.error("Usage: node pets.js destroy INDEX")
      process.exit(1)
    }
    fs.readFile("./pets.json", "utf8", (err, data) => {
      if (err) throw err;
      data = JSON.parse(data)
      var removed = data.splice(process.argv[3],1)
      data = JSON.stringify(data)
      fs.writeFile('./pets.json', data, (err) => {
        if (err) {
          console.error('Usage: node pets.js destroy INDEX');
          process.exit(1);
        };
        console.log(removed[0])
      })
    })
    break;
}
