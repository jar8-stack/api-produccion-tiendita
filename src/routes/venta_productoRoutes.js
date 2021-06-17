const VentaProducto= require('../models/venta_producto');


module.exports= function (app){

  app.get('/VentaProducto', (req, res) =>{
    VentaProducto.getVentaProducto((err, data) =>{
      res.status(200).json(data);
    });
  });


  app.post('/VentaProducto/:id_producto/:id_venta', (req, res) =>{
    const vpData={
      id_producto: req.params.id_producto,
      id_venta: req.params.id_venta,
      cantidad: req.body.cantidad,
      importe: req.body.importe
    };

    VentaProducto.insertVP(vpData, (err, data) =>{
      if(data && data.insertId){
        res.json({
          success: true,
          msg: 'VP insertada',
          data: data
        })
      }else{
        res.status(500).json({
          success: false,
          msg: 'Error'
        })
      }
    });
  });


  app.put('/VentaProducto/:idProducto', (req, res) =>{
    const vpData= {
      id_producto: req.params.id_producto,
      id_venta: req.body.id_venta,
      cantidad: req.body.cantidad,
      importe: req.body.importe
    };
    VentaProducto.updateVP(vpData, (err, data) =>{
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

  app.delete('/VentaProducto/:id_producto', (req, res) =>{
    VentaProducto.deleteVP(req.params.id_producto, (err, data) =>{
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
