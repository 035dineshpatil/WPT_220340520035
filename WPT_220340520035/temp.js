const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
app.use(cors());
const bodyParser = require('body-parser');
app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

const con = mysql.createConnection({
    host: 'localhost',
    user: 'dinesh',
    password: 'dinesh6644',
    database: 'sangli',
  port:3306
});

var result;
app.get("/getBook",function(req,res){
  console.log("getbook");
})
app.post('/addBook', function (req, res) {
    let bookId=req.body.bookid;
    let bookName = req.body.bookname;
    let price = req.body.price;
    console.log(req.body.bookid  + req.body.bookname+req.body.price);
    con.query('insert into book values (?,?,?)', [bookId,bookName,price], 
    (err, res1) => {
      if (err) {
        console.log("error has occured let us see");  
      } else {
        console.log(res1.affectedRows)     
      
      }
    });
    });


app.get('/getBooks', function (req, res) {
  con.query('select bookid, bookname, price from book',
  (err, rows) => {
    if (err) {
      console.log("error has occured let us see");  
    } else {
      if(rows.length > 0)
      {
        for(let i=0; i < rows.length; i++)
        console.log(rows[i].bookid + " " + rows[i].bookname + " " + rows[i].price);     
      }
        else
         console.log("no book found");
    
      }
      res.send(rows);
    });
  });




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});