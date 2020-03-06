
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            // console.log(result[i]);
            console.log("ID: " + result[i].id + "\n" + result[i].name + ": " + "$" + result[i].price);
        }
        inquirer.prompt([{
            name: "id",
            type: "input",
            message: "Enter the ID of the item you would like to buy"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many do you want to buy?"
        }]).then(function (answer) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].id === parseInt(answer.id)) {
                    console.log("hello");
                    if (result[i].stock >= answer.quantity) {
                        var newstock = result[i].stock - answer.quantity;
                        parseInt(newstock);
                        connection.query("UPDATE products SET ? WHERE ?", [{ stock: newstock }, { id: result[i].id }], function(err, res){
                            if(err) throw err;
                        });
                        console.log(newstock);
                    }else{
                        console.log("Not enough Stock!")
                    }
                }
            }
        });
    });
}