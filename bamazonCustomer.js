var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "BamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runItemID();
});

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return "Please enter a valid number";
  }
}

var runItemID = function() {
  inquirer.prompt({
    type: "input",
    name: "item_id",
    message: "Please enter the ID Number of the product you would like to buy",
    validate: validateInput,
    filter: Number
  }).then(function(answer) {
    var query = "SELECT product_name, department_name, price FROM products WHERE ?";
    connection.query(query, { item_id: answer.item_id }, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("Product: " + res[i].product_name);
        console.log("Department: " + res[i].department_name);
        console.log("Price: " + res[i].price);
      }
      runSearch();
    });
  });
};

var runSearch = function() {
  inquirer.prompt({
    type: "input",
    name: "quantity",
    message: "How many units of this product would you like to buy?",
    validate: validateInput,
    filter: Number
  }).then(function(input) {
      var quantity = input.quantity;
      var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { stock_quantity: quantity }, function(err, data) {
          if (err) throw err;
          if (data.length === 0) {
             console.log("Invalid Item ID");

          } else {
             var productInfo = data[0];

            if (quantity <= productInfo.stock_quantity) {

            var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productInfo.stock_quantity - quantity) + ' WHERE item_id = ' + item;
              connection.query(updateQueryStr, function(err, data) {
              
              if (err) throw err;
                console.log("Thank you, your order has been placed! Your total is $" + productInfo.price * quantity);

                connection.end();
                })
                } else {
                    console.log("Insuficient quantity!");

                }
            }
        })
    })
}