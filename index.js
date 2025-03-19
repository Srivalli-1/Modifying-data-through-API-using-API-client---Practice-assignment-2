const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');


const app = express();
const port = 3010;

mongoose.connect('mongodb+srv://sarayu2926:kKH39Gc5MSJQ1ePs@cluster0.9vtme.mongodb.net/api 2?retryWrites=true&w=majority&appName=Cluster0',{

})

.then(()=>console.log('Mongodb connected'))
.catch(err=>console.error('Mongodb connection error:',err));

const menuItemSchema = new mongoose.Schema({
name:{type:String,required:true},
description:{type:String},

price:{type:Number,required:true}


}); 

const MenuItem= mongoose.model('MenuItem',menuItemSchema);

app.put('/menu/:id',async(req,res)=>{
  try{
    const{name,description,price}=req.body;
    if(!name && !description && price==undefined){
   return res.status(400).json({message: 'update' })
    }

   const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id,req.body,{new:true,renValidators:true});
   if(!updatedItem){
    return res.status(404).json({message: 'Menu item not found'});
   
   }
   res.json(updatedItem);


  } catch(error){
    res.status(500).json({message: 'error',details:error.message});
  }
});

app.delete('/menu/:id',async(req,res)=>{
try{
  const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
  if(!deletedItem){
    return res.status(404).json({message: 'Menu item not found'});

  }
  res.json({message:'Menu item deleted'});
}
  catch(error){
    res.status(500).json({message:'error',details:error.message})
  }


})
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
