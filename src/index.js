const express = require('express');
const app = express();
//Setings
app.set('port', process.env.PORT || 3000);

//Middleware
app.use(express.json());//accedemos a la informacion en formato json
 
//Routers
app.use(require('./routes/employees'));

//Inicia el servidor
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
}); 