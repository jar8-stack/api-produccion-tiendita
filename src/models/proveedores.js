const connection= require('../models/connection')

let proveedorModel= {};



proveedorModel.getProveedores= (callback) => {
  if(connection){
    connection.query(
      'SELECT * FROM proveedor ORDER BY id_proveedor',
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

proveedorModel.insertProveedor=(proveedorData, callback) =>{
  if(connection){
    connection.query(
      'INSERT INTO proveedor SET ?', proveedorData,
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

proveedorModel.deleteProveedor= (id_proveedor, callback) =>{
  if(connection){
    let sql= `
      SELECT * FROM proveedor WHERE id_proveedor= ${connection.escape(id_proveedor)}
    `;

    connection.query(sql, (err, row) =>{
      if(row){
        let sql= `
          DELETE FROM proveedor WHERE id_proveedor= ${connection.escape(id_proveedor)}
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
}

proveedorModel.updateProveedor=(proveedorData, callback)=>{
  if(connection){
    const sql= `
      UPDATE proveedor SET
      nombre= ${connection.escape(proveedorData.Nombre)},
      contacto= ${connection.escape(proveedorData.Contacto)}
      WHERE id_proveedor= ${connection.escape(proveedorData.id_proveedor)}
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


module.exports= proveedorModel;
