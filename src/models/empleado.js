const connection= require('../models/connection')
let empleadoModel= {};


empleadoModel.getEmpleados= (callback) =>{
  if(connection){
    connection.query(
      'SELECT * FROM empleado ORDER BY id_empleado',
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

empleadoModel.insertEmpleado= (empleadoData, callback) =>{
  if(connection){
    connection.query(
      'INSERT INTO empleado SET ?', empleadoData,
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


empleadoModel.updateEmpleado= (empleadoData, callback) =>{
  if(connection){
    const sql= `
      UPDATE empleado SET
      salario= ${connection.escape(empleadoData.salario)},
      id_sucursal= ${connection.escape(empleadoData.id_sucursal)}
      WHERE id_empleado= ${connection.escape(empleadoData.id_empleado)}
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

empleadoModel.deleteEmpleado= (id_empleado, callback) =>{
  if(connection){
    let sql=  `
      SELECT * FROM empleado WHERE id_empleado= ${connection.escape(id_empleado)}
    `;

    connection.query(sql, (err, row) =>{
      if(row){
        let sql= `
          DELETE FROM empleado WHERE id_empleado= ${connection.escape(id_empleado)}
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



module.exports= empleadoModel;
