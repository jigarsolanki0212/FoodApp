import {openDatabase} from 'react-native-sqlite-storage';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';
var db = openDatabase({name: 'foodAppData.db'});

let registered_user = [
  `create table if not exists Registered_User_Detail(
    "user_id" integer primary key autoincrement,
    "fullname" text,
    "email" text,
    "password" text
  )`,
  `create table if not exists Cart(
    "id" integer primary key autoincrement,
    "item_id" integer,
    "quantity" integer,
    "user_id" integer,
    "active" integer
  )`,
  `create table if not exists Favourite(
    "id" integer primary key autoincrement,
    "item_id" integer,
    "status" integer,
    "user_id" integer

  )`,

  `create table if not exists Orders(
    "orderID" integer primary key autoincrement,
    "items" text,
    "user_id" integer,
    "address_id" integer,
    "payment_type" text,
    "subTotal" double,
    "delivery_Fee" double,
    "userName" text
  )`,

  `create table if not exists user_Address(
    "address_id" integer primary key autoincrement,
    "user_id" integer,
    "address_line_1" text,
    "city" text,
    "zip" text,
    "default" text,
    "address_type" text,
    "active" integer
  )`,
];

export async function getOrderdAddress(address_id) {
  let userAdd = await ExecuteQuery(
    `SELECT * FROM user_Address where address_id = ${address_id}`,
  );
  return userAdd;
}
export async function deleteItemFromCart(quantity, id) {
  let deleteCartItem = await ExecuteQuery(
    `Update Cart set quantity = ${quantity}, active = 0 where item_id = ${id}`,
  );

  return deleteCartItem;
}

export async function EditUserAddressOnEditIcon(
  address_line_1,
  city,
  zip,
  isdefault,
  address_type,
  address_id,
) {
  let editAddress = await ExecuteQuery(
    `UPDATE user_Address SET address_line_1 = '${address_line_1}', city = '${city}', zip = '${zip}', 'default' = '${isdefault}', address_type = '${address_type}'  WHERE address_id= ${address_id}`,
  );

  return editAddress;
}
export async function updateCartActive(quantity, id) {
  let UpdateActiveCartItem = await ExecuteQuery(
    `Update Cart set quantity = ${quantity} where item_id = ${id} and active = 1`,
  );

  return UpdateActiveCartItem;
}

export async function insertCartOrActive(item_id, quantity) {
  const user = await AsyncStorage.getItem('userid');

  console.log(`INSERT INTO Cart("item_id", "quantity","user_id", "" ) 
     VALUES 
      ('${item_id}','${quantity}','${user}', 1)`);
  let sql = `INSERT INTO Cart("item_id", "quantity","user_id", active ) 
     VALUES 
      ('${item_id}','${quantity}','${user}', 1)`;

  let insertCartItem = await ExecuteQuery(sql, []);

  return insertCartItem;
}

export async function getCartData(cartId) {
  // console.log(cartId, 'cartid');
  let query = `SELECT * FROM Cart where id in (` + cartId + `)`;
  // console.log('Query :::: ', query);
  let orderdata = await ExecuteQuery(query);
  // console.log('count == ', orderdata?.rows?.length);
  return orderdata;
}

export async function getAllOrders() {
  const user = await AsyncStorage.getItem('userid');

  let orderData = await ExecuteQuery(
    `SELECT * FROM Orders where user_id = '${user}'`,
  );

  return orderData;
}

export async function updateCartOnPlaceOrder(id) {
  let UpdateCartItem = await ExecuteQuery(
    `Update Cart SET  active = 0 WHERE id = '${id}'`,
  );

  return UpdateCartItem;
}

export async function getAddressOfUser(user_id) {
  let addressOFuser = await ExecuteQuery(
    `SELECT * FROM user_Address where user_id = '${user_id}' and active = 1`,
  );
  return addressOFuser;
}

export async function deleteAddressOfUser(address_id) {
  let dltuserAddress = await ExecuteQuery(
    `UPDATE user_Address SET active=0 WHERE address_id= '${address_id}'`,
  );
  return dltuserAddress;
}

export async function updateAddressOfUser(address, address_id) {
  let updateAddress = await ExecuteQuery(
    `UPDATE user_Address SET address= '${address}' WHERE address_id= '${address_id}'`,
  );
  return updateAddress;
}

export async function insertAddress(
  address_line_1,
  city,
  zip,
  isdefault,
  address_type,
) {
  const user = await AsyncStorage.getItem('userid');

  let sql = `INSERT INTO user_Address("user_id", "address_line_1", "city", "zip", "default", "address_type", "active" ) 
     VALUES 
      (${user},'${address_line_1}','${city}','${zip}','${isdefault}','${address_type}',1)`;
  let result = await ExecuteQuery(sql, []);
  return result;
}

export async function insertOrder(
  items,
  address_id,
  payment_type,
  subTotal,
  delivery_Fee,
  userName,
) {
  const user = await AsyncStorage.getItem('userid');

  let sql = `INSERT INTO Orders("items", "user_id", "address_id", "payment_type", "subTotal", "delivery_Fee", "userName") 
     VALUES 
      ('${items}','${user}',${address_id}, '${payment_type}',${subTotal}, ${delivery_Fee} ,'${userName}' )`;
  let result = await ExecuteQuery(sql, []);
  // console.log(result + ' data inserted');
  return result;
}

export async function createTable() {
  for (const query of registered_user) {
    let Table = await ExecuteQuery(query);
    // console.log(Table + ' table created');
  }
}

const encryptionPass = UserPassword => {
  let a = Buffer.from(UserPassword, 'utf8').toString('base64');
  // console.log(a, 'Encryption pass');
  return a;
};

export async function insertUserData(UserName, UserEmail, UserPassword) {
  var encryptedPass = encryptionPass(UserPassword);
  let sql = `INSERT INTO Registered_User_Detail("fullname", "email", "password" ) 
     VALUES 
      ('${UserName}','${UserEmail}','${encryptedPass}')`;
  let result = await ExecuteQuery(sql, []);
  // console.log(result + ' data inserted');
  return result;
}

export async function insertfavoriteitem(item_id, status) {
  // console.log('fav instert');
  const user = await AsyncStorage.getItem('userid');
  let sql = `INSERT INTO Favourite("item_id", "status","user_id" ) 
     VALUES 
      ('${item_id}','${status}','${user}')`;
  let result = await ExecuteQuery(sql, []);
  // console.log(result + ' data inserted');
  return result;
}
export async function insertCartItem(item_id, quantity) {
  console.log('cart inserted');
  const user = await AsyncStorage.getItem('userid');
  let sql = `INSERT INTO Cart("item_id", "quantity","user_id", active ) 
     VALUES 
      ('${item_id}','${quantity}','${user}', 1)`;
  let result = await ExecuteQuery(sql, []);
  console.log(result + ' data inserted');
  return result;
}
export async function getCartItem(id) {
  const user = await AsyncStorage.getItem('userid');

  let selectdItem = await ExecuteQuery(
    `SELECT * FROM Cart where item_id = '${id}' and active = 1 and user_id= '${user}'`,
  );

  return selectdItem;
}

export async function getAllCartItem() {
  const user = await AsyncStorage.getItem('userid');

  let selectdItem = await ExecuteQuery(
    `SELECT * FROM Cart where quantity >0 and active = 1 and user_id= '${user}'`,
  );

  return selectdItem;
}
export async function updateCart(quantity, id) {
  var activeStatus = quantity == 0 ? 0 : 1;
  var query = `Update Cart set quantity = ${quantity},active = ${activeStatus} where item_id = ${id} and active = 1`;
  console.log(query);
  let UpdateCartItem = await ExecuteQuery(query);

  return UpdateCartItem;
}
export async function updateCartToLow(id) {
  let UpdateCartItem = await ExecuteQuery(
    `Update Cart set quantity = 0, active = 0 where item_id = ${id} and active = 1`,
  );

  return UpdateCartItem;
}

export async function getFavouriteitem(id) {
  const user = await AsyncStorage.getItem('userid');

  let selectdItem = await ExecuteQuery(
    `SELECT * FROM Favourite where item_id = '${id}'and user_id= '${user}'`,
  );

  return selectdItem;
}
export async function getAllFavitem() {
  const user = await AsyncStorage.getItem('userid');

  let selectdItem = await ExecuteQuery(
    `SELECT * FROM Favourite where status = 1 and user_id= '${user}'`,
  );

  return selectdItem;
}

export async function updateFavitem(staus, id) {
  const user = await AsyncStorage.getItem('userid');

  let DeleteFavItem = await ExecuteQuery(
    `Update Favourite  set status = ${staus} where id = ${id} and user_id= '${user}'`,
  );

  return DeleteFavItem;
}

export async function getUserData(UserEmail) {
  let regUserData = await ExecuteQuery(
    `SELECT * FROM Registered_User_Detail where email = '${UserEmail}'`,
  );

  return regUserData;
}

export async function getDataOfUser(user_id) {
  let datofUser = await ExecuteQuery(
    `SELECT * FROM Registered_User_Detail where user_id = '${user_id}'`,
  );
  return datofUser;
}

export async function updateUser(name, updateEmail, user_id) {
  let userdata = await ExecuteQuery(
    `Update Registered_User_Detail set fullname = '${name}', email = '${updateEmail}' where user_id= ${user_id}`,
  );

  return userdata;
}

const ExecuteQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.transaction(trans => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        },
      );
    });
  });
