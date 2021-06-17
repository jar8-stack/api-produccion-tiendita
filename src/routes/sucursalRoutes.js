const Sucursal= require('../models/sucursal');

module.exports= function (app){
  app.get('/Sucursal', (req, res)=>{
    Sucursal.getSucursales((err, data) =>{
      res.status(200).json(data);
    });
  });

  app.post('/Sucursal/:id_usuario', (req, res) =>{
    const sucursalData= {
      idSucursal: null,
      Nombre: req.body.Nombre,
      ubicacion: req.body.ubicacion, 
      id_usuario: req.params.id_usuario 
    };

    Sucursal.insertSucursal(sucursalData, (err, data)=>{
      if(data && data.insertId){
        res.json({
          success: true,
          msg: 'Sucursal insertada',
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

  app.put('/Sucursal/:idSucursal', (req, res) =>{
    const sucursalData= {
      idSucursal: req.params.idSucursal,
      Nombre: req.body.Nombre,
      ubicacion: req.body.ubicacion      
    };

    Sucursal.updateSucursal(sucursalData, (err, data) =>{
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

  app.delete('/Sucursal/:idSucursal', (req, res) =>{
    Sucursal.deleteSucursal(req.params.idSucursal, (err, data) =>{
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
