const connection= require('../models/connection')

let venta_productoModel= {};


venta_productoModel.getVentaProducto= (callback) =>{
  if(connection){
    connection.query(
      'SELECT * FROM venta_producto ORDER BY id_venta',
    (err, rows) => {
      if(err){
        throw err;
      }else{
          callback(null, rows);
      }
    }
  )
  }
};


venta_productoModel.insertVP= (vpData, callback) =>{
  if(connection){
    connection.query(
      'INSERT INTO venta_producto SET ?', vpData,
      (err, result) => {
        if(err){
          throw err;
        }else{
          callback(null, {
            'insertId': result.insertId
          })
        }
      }
    );
  }
};

venta_productoModel.updateVP= (vpData, callback) =>{
  if(connection){
    const sql= `
      UPDATE venta_producto SET
      Cantidad= ${connection.escape(vpData.Cantidad)},
      Importe= ${connection.escape(vpData.Importe)}
      WHERE id_producto= ${connection.escape(vpData.id_producto)}
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

venta_productoModel.deleteVP= (id_producto, callback) =>{
  if(connection){
    let sql= `
      SELECT * FROM venta_producto WHERE id_producto= ${connection.escape(id_producto)}
    `;

    connection.query(sql, (err, row) =>{
      if(row){
        let sql= `
          DELETE FROM venta_producto WHERE id_producto= ${connection.escape(id_producto)}
        `;

        connection.query(sql, (err, result)=>{
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

//
module.exports= venta_productoModel;
