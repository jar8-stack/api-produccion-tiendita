const connection= require('../models/connection')

let userModel= {};

userModel.getUsers= (callback) => {
  if(connection){
    connection.query(
      'SELECT * FROM usuario ORDER BY id_usuario',
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


userModel.insertUser = (userData, callback) =>{

  if(connection){
    connection.query(
      'INSERT INTO usuario SET ?', userData,
      (err, result) => {
        if(err){
          throw err;
        }else {
          callback(null, {
            'insertId': result.insertId
          })
        }
      }
    );
  }

};


userModel.updateUser= (userData, callback) =>{
  if(connection){
    const sql= `
      UPDATE usuario SET
      nombre= ${connection.escape(userData.Nombre)},
      apellido_paterno= ${connection.escape(userData.apellido_paterno)},
      apellido_materno= ${connection.escape(userData.apellido_materno)},
      usuario= ${connection.escape(userData.Usuario)},
      correo= ${connection.escape(userData.Correo)},
      password= ${connection.escape(userData.Password)},
      tipo_user= ${connection.escape(userData.Tipo_user)}
      WHERE id_usuario = ${connection.escape(userData.id_usuario)}
    `

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

userModel.deleteUser=(id_usuario, callback) =>{
  if(connection){
    let sql=  `
      SELECT * FROM usuario WHERE id_usuario= ${connection.escape(id_usuario)}
    `;

    connection.query(sql, (err, row) =>{
      if(row){
        let sql= `
          DELETE FROM usuario WHERE id_usuario= ${connection.escape(id_usuario)}
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
}

module.exports = userModel;
