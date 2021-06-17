const express= require('express');
const app= express();


const morgan= require('morgan');
const bodyParser= require('body-parser');

//settings
app.set('port', process.env.PORT || 3000);

// midlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
require('./routes/userRoutes')(app);
require('./routes/proveedoresRoutes')(app);
require('./routes/empleadoRoutes')(app);
require('./routes/productoRoutes')(app);
require('./routes/ventaRoutes')(app);
require('./routes/venta_productoRoutes')(app);
require('./routes/sucursalRoutes')(app);



// static files

app.listen(app.get('port'), ()=>{
  console.log('server on port 3000');
});
