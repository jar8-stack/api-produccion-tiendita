const Venta= require('../models/venta');


module.exports= function (app){


  app.get('/Venta', (req, res) =>{
    Venta.getVentas((err, data) =>{
      res.status(200).json(data);
    });
  });


  app.post('/Venta/:id_usuario', (req, res) =>{
    const ventaData= {
      id_venta: null,
      cantidad: req.body.cantidad,
      fecha: req.body.fecha,
      total: req.body.total,
      id_usuario: req.params.id_usuario
    };
    Venta.insertVenta(ventaData, (err, data) =>{
      if(data && data.insertId){
        res.json({
          success: true,
          msg: 'Venta insertada',
          data: data
        })
      }else{
        res.status(500).json({
          success: false,
          msg: 'Error'
        })
      }
    })
  });

  app.put('/Venta/:id_venta', (req, res) =>{
    const ventaData= {
      id_venta: req.params.id_venta,
      cantidad: req.body.cantidad,
      fecha: req.body.fecha,
      total: req.body.total,
      id_usuario: req.body.id_usuario
    };
    Venta.updateVenta(ventaData, (err, data) =>{
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

  app.delete('/Venta/:id_venta', (req, res) =>{
    Venta.deleteVenta(req.params.id_venta, (err, data) =>{
      if(data && data.msg==='deleted' | data.msg=='not exists'){
        res.json({
          success: true,
          data
        })
      }else{
        res.status(500).json({
          msg: 'Error'
        });
      }
    });
  });


}


//
