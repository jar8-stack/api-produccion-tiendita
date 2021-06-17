const connection= require('../models/connection')
let sucursalModel= {};


sucursalModel.getSucursales= (callback) =>{
  if(connection){
    connection.query(
      'SELECT * FROM sucursal ORDER BY idSucursal',
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

sucursalModel.insertSucursal= (sucursalData, callback) =>{
  if(connection){
    connection.query(
      'INSERT INTO sucursal SET ?', sucursalData,
      (err, result)  =>{
        if(err){
          throw err;
        }else{
          callback(null, {
            insertId: result.insertId
          });
        }
      }
    );
  }
};


sucursalModel.updateSucursal= (sucursalData, callback) =>{
  if(connection){
    const sql= `
      UPDATE sucursal SET
      Nombre= ${connection.escape(sucursalData.Nombre)},
      ubicacion= ${connection.escape(sucursalData.ubicacion)}
      WHERE idSucursal= ${connection.escape(sucursalData.idSucursal)}
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

sucursalModel.deleteSucursal= (idSucursal, callback) =>{
  if(connection){
    let sql=  `
      SELECT * FROM sucursal WHERE idSucursal= ${connection.escape(idSucursal)}
    `;

    connection.query(sql, (err, row) =>{
      if(row){
        let sql= `
          DELETE FROM sucursal WHERE idSucursal= ${connection.escape(idSucursal)}
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



module.exports= sucursalModel;
