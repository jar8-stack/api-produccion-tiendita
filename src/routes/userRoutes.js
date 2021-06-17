const User= require('../models/user');

module.exports=function (app){

  app.get('/Usuario', (req, res) =>{
    User.getUsers((err, data) =>{
      res.status(200).json(data);
    });
  });

  app.post('/Usuario', (req, res) =>{
    const userData= {
      id_usuario: null,
      nombre: req.body.nombre,
      apellido_paterno: req.body.apellido_paterno,
      apellido_materno: req.body.apellido_materno,
      usuario: req.body.usuario,
      correo: req.body.correo,
      password: req.body.password,
      tipo_user: req.body.tipo_user,
    };

    User.insertUser(userData, (err, data) =>{
      if(data && data.insertId){
        res.json({
          success: true,
          msg: 'Usuario insertado',
          data: data
        })
      }else{
        res.status(500).json({
          success: false,
          msg: 'Error'
        });
      }
    });
  });

  app.put('/Usuario/:id_usuario', (req, res) =>{
    const userData= {
      id_usuario: req.params.idUsuario,
      nombre: req.body.nombre,
      apellido_paterno: req.body.apellido_paterno,
      apellido_materno: req.body.apellido_materno,
      usuario: req.body.usuario,
      correo: req.body.correo,
      password: req.body.password,
      tipo_user: req.body.tipo_user,            
    };
    User.updateUser(userData, (err, data) =>{
      if(data && data.msg){
        res.json(data);
      }else{
        res.json({
          success: false,
          msg: 'Error'
        })
      }
    });
  });

  app.delete('/Usuario/:id', (req, res) =>{
    User.deleteUser(req.params.id, (err, data) =>{
      if(data && data.msg==='deleted' || data.msg === 'not exists'){
        res.json({
          success: true,
          data
        });
      }else{
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });



  //

}
