
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
            console.log(result[i].stock);
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
                    if (result[i].stock >= answer.quantity) {
                        var newstock = result[i].stock - answer.quantity;
                        parseInt(newstock);
                        connection.query("UPDATE products SET ? WHERE ?", [{ stock: newstock }, { id: result[i].id }], function(err, res){
                            if(err) throw err;
                        });
                        console.log("Order Complete"+"\n"+"You spent: $" + result[i].price * parseInt(answer.quantity));
                        end();
                    }else{
                        console.log("Not enough Stock!");
                        end();
                    }
                }
            }
        });
    });
}
function end(){
    inquirer.prompt([{
        name: "end",
        type: "list",
        message: "What would you like to do?",
        choices: ["Continue Shopping", "Exit"]
    }]).then(function(answer){
        if(answer.end === "Continue Shopping"){
            start();
        }
        else{
            connection.end();
            console.log("Thank you for using Bamazon");
        }
    });
}