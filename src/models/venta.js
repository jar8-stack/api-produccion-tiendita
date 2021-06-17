const connection= require('../models/connection')


let ventaModel= {};

ventaModel.getVentas= (callback) =>{
  if(connection){
    connection.query(
      'SELECT * FROM venta ORDER BY id_venta',
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

ventaModel.insertVenta= (ventaData, callback) =>{
  if(connection){
    connection.query(
      'INSERT INTO venta SET ?', ventaData,
      (err, result) =>{
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


ventaModel.updateVenta= (ventaData, callback)=>{
  if(connection){
    const sql= `
      UPDATE venta SET
      cantidad= ${connection.escape(ventaData.Cantidad)},
      fecha= ${connection.escape(ventaData.Fecha)},
      total= ${connection.escape(ventaData.Total)}
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

ventaModel.deleteVenta= (id_venta, callback) =>{
  if(connection){
    let sql= `
      SELECT * FROM venta WHERE id_venta= ${connection.escape(id_venta)}
    `;

    connection.query(sql, (err, row) =>{
      if(row){
        let sql= `
          DELETE FROM venta WHERE id_venta= ${connection.escape(id_venta)}
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
module.exports= ventaModel;
