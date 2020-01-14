const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Item= require('./models/item')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})
app.get('/',function(req,res){
    Item.find({},function(err,items){
        if(err){console.log("error")}
        return res.render('home',{item:items,});
    })
})
app.post('/create-task',function(req,res){
    console.log(req.body)
    Item.create({
        description:req.body.description,
        date:req.body.date,
    },function(err, newItem){
        if(err){
            console.log("Error",err);
            return
        }
        console.log(newItem);
        return res.redirect('back');
    })
})
// app.post('/create-task',function(req,res){
//     Item.create({
//         description:req.body.description,
//         date:req.body.date,
//     },function(err, newItem){
//         if(err){
//             console.log("Error",err);
//             return
//         }
//         console.log(newItem);
//         return res.redirect('back');
//     })
// })

app.post('/delete-task',function(req,res){
  let id = req.query.id;
  Item.findOneAndDelete(id,function(err, newItem){
        if(err){
            console.log("Error",err);
            return
        }
        console.log(newItem);
        return res.redirect('back');
    })
})