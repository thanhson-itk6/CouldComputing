var pg_conn = require("./pg_config");
async function gen_box(selectValue = -1) {
  // Query DB to get the table data
  let shops_query = `SELECT shops.id, shops.name, users.role FROM shops 
                      JOIN users ON shops.id = users.shop_id`;
  const data = await pg_conn.query(shops_query);
  let box_string = `
    <form action="/admin/select_box" method="post">
      <label 
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        for="shops">Choose a shop:</label>
        <select 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="shops" id="shop_id">
            <option value=4 ${
              selectValue == -1 ? ` selected` : ""
            }>All shops</option>`;
  let select_items = data.rowCount;
  for (let i = 0; i < select_items; i++) {
    if (data.rows[i].role !== "director") {
      box_string += `<option value=${data.rows[i].id} ${
        selectValue == data.rows[i].id ? ` selected` : ""
      }>${data.rows[i].name}</option>`;
    }
  }
  box_string += `</select>
    <input 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="submit" value="view">
  </form>`;
  // console.log(data);
  return box_string;
}
module.exports = gen_box;
