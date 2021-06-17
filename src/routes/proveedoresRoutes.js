const Proveedor= require('../models/proveedores');

module.exports= function (app){
  app.get('/Proveedor', (req, res) =>{
    Proveedor.getProveedores((err, data) =>{
      res.status(200).json(data);
    });
  });

  app.put('/Proveedor/:id_proveedor', (req, res)=>{
    const proveedorData={
      id_proveedor: req.params.id_proveedor,
      nombre: req.body.nombre,
      contacto: req.body.contacto,
      id_sucursal: req.body.id_sucursal
    };
    Proveedor.updateProveedor(proveedorData, (err, data) =>{
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

  app.post('/Proveedor', (req, res) =>{
    const proveedorData={
      id_proveedor: null,
      nombre: req.body.nombre,
      contacto: req.body.contacto,      
    };
    Proveedor.insertProveedor(proveedorData, (err, data) =>{
      if(data && data.insertId){
        res.json({
          success: true,
          msg: 'Proveedor insertado',
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

  app.delete('/Proveedor/:id_usuario', (req, res) =>{
    Proveedor.deleteProveedor(req.params.id_usuario, (err, data) =>{
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
