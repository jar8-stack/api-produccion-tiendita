const connection= require('../models/connection');

let productoModel= {};

productoModel.getProductos= (callback) =>{
  if(connection){
    connection.query(
      'SELECT * FROM producto ORDER BY id_producto',
      (err, rows) =>{
        if(err){
          throw err;
        }else{
            callback(null, rows);
        }
      }
    )
  }
};

productoModel.insertProducto= (productoData, callback) =>{
  if(connection){
    connection.query(
      'INSERT INTO producto SET ?', productoData,
      (err, result) => {
        if(err){
          throw err;
        }else {
          callback(null, {
            'insertId': result.insertId
          })
        }
      }
    )
  }
};


productoModel.updateProducto= (productoData, callback) =>{
  if(connection){
    const sql= `
      UPDATE producto SET
      descripcion= ${connection.escape(productoData.descripcion)},
      precio= ${connection.escape(productoData.precio)},
      stock= ${connection.escape(productoData.stock)}      
      WHERE id_producto= ${connection.escape(productoData.id_producto)}
    `;

    connection.query(sql, (err, result)=>{
      if(err){
        throw err
      }else{
        callback(null, {
          "msg": "success"
        });
      }
    });
  }
};

productoModel.deleteProduct= (id_producto, callback) =>{
  if(connection){
    let sql=  `
      SELECT * FROM producto WHERE id_producto= ${connection.escape(id_producto)}
    `;

    connection.query(sql, (err, row) =>{
      if(row){
        let sql= `
          DELETE FROM producto WHERE id_producto= ${connection.escape(id_producto)}
        `;

        connection.query(sql, (err, result) =>{
          if(err){
            throw err;
          }else{
            callback(null, {
              msg: 'deleted'
            })
          }
        });
      }else{
        callback(null, {
          msg: 'not exists'
        });
      }
    });
  }
};

module.exports= productoModel;
