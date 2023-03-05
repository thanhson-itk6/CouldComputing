var pg_conn = require("./pg_config");
const session = require("express-session");

async function display_products(shop_id) {
  // query global variable
  var products_query;

  if (shop_id == 4) {
    products_query = "SELECT * FROM products";
  } else {
    products_query = {
      text: "SELECT * FROM products WHERE shop_id = $1",
      values: [shop_id],
    };
  }

  const data = await pg_conn.query(products_query);

  let table_string = `
    
        </head>
        <body>
        <table class="table">
    <tr>`;
  //--- display all header of table
  let num_fields = data.fields.length;
  for (let i = 0; i < num_fields; i++) {
    table_string += `<td>${data.fields[i].name}</td>`;
  }

  table_string += `<th>Actions</th>
        </tr>`;

  //--- display all rows of table
  let num_rows = data.rows.length;
  for (let i = 0; i < num_rows; i++) {
    table_string += `
        <form action="/users/crud" method="post">
            <tr>`;
    for (let j = 0; j < num_fields; j++) {
      let field_name = data.fields[j].name;
      let cell = data.rows[i][field_name];
      table_string += `<td><input type='text' name=${field_name} value=${cell}></td>`;
    }

    // add buttons if there is not admin role

    table_string += `<td>
                <button type="submit" name='crud' 
                    class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" value='update'>Update</button>
                <button type="submit" name='crud' 
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    value='delete'>Delete</button>
            </td>`;
    table_string += `</tr></form>`;
  }

  // add form submit for insert

  table_string += `<form action="/users/crud" method="post"><tr>`;
  for (let j = 0; j < num_fields; j++) {
    let field_name = data.fields[j].name;
    table_string += `<td><input type='text' name=${field_name}></td>`;
  }

  table_string += `<td>
            <button type="submit" 
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                name='crud' 
                value='insert'>Insert</button>
        </td>`;

  // close form and table
  table_string += `</tr></form>`;

  table_string += `</table>`;
  // console.log(data);
  return table_string;
}

// export tables
module.exports = display_products;
