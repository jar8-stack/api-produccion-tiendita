const Producto= require('../models/producto');


module.exports= function (app){
  app.get('/Producto', (req, res) =>{
    Producto.getProductos((err, data) =>{
      res.status(200).json(data);
    });
  });



  app.post('/Producto/:id_proveedor', (req, res) =>{
    const productoData={
      id_producto: null,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock,
      id_proveedor: req.params.id_proveedor
    };

    Producto.insertProducto(productoData, (err, data) =>{
      if(data && data.insertId){
        res.json({
          success: true,
          msg: 'Producto insertado',
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


  app.put('/Producto/:id_producto', (req, res) =>{
    const productoData= {
      id_producto: req.params.id_producto,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock      
    };

    Producto.updateProducto(productoData, (err, data) =>{
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

  app.delete('/Producto/:id_producto', (req, res) =>{
    Producto.deleteProduct(req.params.id_producto, (err, data) =>{
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
