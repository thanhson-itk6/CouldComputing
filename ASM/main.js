var express = require('express');
const async = require('hbs/lib/async')
const mongo = require('mongodb');
const { ObjectId } = require('mongodb')
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://thanhson:thanhson123@asm.yds0vyp.mongodb.net/test'

const PORT = process.env.PORT || 1707
app.listen(PORT)
console.log("Server is running")

// Index page
app.get('/', (req,res) =>{
    res.render('AllBooks')
})

// Add book
app.get('/create',(req,res)=>{
    res.render('NewBook')
})

app.post('/NewBook',async (req,res)=>{
    let bookname = req.body.txtName
    let bookprice =req.body.txtPrice
    let booktype = req.body.txtType
    let bookreview = req.body.txtReview
    let bookpublicationyear = req.body.txtPublicationyear
    let book = {
        'bookname':bookname,
        'bookprice': bookprice,
        'booktype':booktype,
        'bookreview': bookreview,
        'bookpublicationyear': bookpublicationyear
    }
    let client= await MongoClient.connect(url);
    let dbo = client.db("Books");
    await dbo.collection("Book").insertOne(book);
    if (book == null) {
        res.render('/')
    }
    res.redirect('/ViewAll')
    
})

// All Book list
app.get('/ViewAll',async (req,res)=>{
    var page = req.query.page
    let client= await MongoClient.connect(url);
    let dbo = client.db("Books");
        let books = await dbo.collection("Book").find().toArray()
        res.render('AllBooks',{'books':books})
    
})

// Update book
app.get('/update',async(req,res)=>{
    let id = req.query.id;
    const client = await MongoClient.connect(url)
    let dbo = client.db("Books")
    let books = await dbo.collection("Book").findOne({_id : ObjectId(id)})
    res.render('update', {'books': books})

})
app.post('/updateBook', async(req,res)=>{
    let id = req.body._id;
    let bookname = req.body.txtName
    let bookprice =req.body.txtPrice
    let booktype = req.body.txtType
    let bookreview = req.body.txtReview
    let bookpublicationyear = req.body.txtPublicationyear
    let client = await MongoClient.connect(url)
    let dbo = client.db("Books")
    console.log(id)
    await dbo.collection("Book").updateOne({_id: ObjectId(id)}, {
         $set: {
             'bookname':bookname,
             'bookprice': bookprice,
             'booktype':booktype,
             'bookreview': bookreview,
             'bookpublicationyear': bookpublicationyear
         }
    })
    res.redirect('/ViewAll')
})

// Delete book
app.get('/delete',async(req,res)=>{
    let id = mongo.ObjectId(req.query.id); 
    const client = await MongoClient.connect(url);
    let dbo = client.db("Books");
    let collection = dbo.collection('Book')
    let books = await collection.deleteOne({'_id' : id});
    res.redirect('/ViewAll')
})



