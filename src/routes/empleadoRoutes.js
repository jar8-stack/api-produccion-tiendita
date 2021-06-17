const Empleado= require('../models/empleado');

module.exports= function (app){
  app.get('/Empleado', (req, res)=>{
    Empleado.getEmpleados((err, data) =>{
      res.status(200).json(data);
    });
  });

  app.post('/Empleado/:id_sucursal', (req, res) =>{
    const empleadoData= {
      id_empleado: null,
      salario: req.body.salario,
      id_sucursal: req.params.id_sucursal      
    };

    Empleado.insertEmpleado(empleadoData, (err, data)=>{
      if(data && data.insertId){
        res.json({
          success: true,
          msg: 'Empleado insertado',
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

  app.put('/Empleado/:id_empleado', (req, res) =>{
    const empleadoData= {
      id_empleado: req.params.id_empleado,
      salario: req.body.salario,
      id_sucursal: req.body.id_sucursal      
    };
    console.log(empleadoData);

    Empleado.updateEmpleado(empleadoData, (err, data) =>{
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

  app.delete('/Empleado/:id_empleado', (req, res) =>{
    Empleado.deleteEmpleado(req.params.id_empleado, (err, data) =>{
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


}
