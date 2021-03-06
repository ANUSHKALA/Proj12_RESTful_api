const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title : String,
    content: String
}

const Article = mongoose.model("Article", articleSchema)


app.route("/articles")
.get(
    function (req,res){
        Article.find({},function (err, foundDoc){
            if(!err){
                res.send(foundDoc);
            }
            else{
                res.send(err);
            }
        })
    }
)
.post(
    function (req,res){
        console.log(req.body.title);
        console.log(req.body.content);
    
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        })
        newArticle.save(function (err){
            if(!err){
                console.log("Logged successfully");
            }
            else{
                console.log(err)
            }
        });
    }
)
.delete(
    function (req,res){
        Article.deleteMany(function (err){
            if(!err){
                console.log("a;; items deleted successfully!");
            }
            else{
                console.log(err);
            }
        })
    }
);

app.route("/articles/:articleTitle")

.get(
    function (req,res){
        Article.findOne({title: req.params.articleTitle},function (err,foundArticle){
            if(!err){
                console.log(foundArticle);
            }
            else{
                res.send(err);
            }
        })
    }
)
.put(
    function (req,res){
        Article.replaceOne(
            {
                title: req.params.articleTitle
            },
            {
                title: req.body.title,
                content: req.body.content
            },

            function (err) {
                if(!err){
                    console.log("Updated successfully!")
                }
                else{
                    console.log(err)
                }
            }
        )
    }
)

app.listen(3000,function(){
    console.log("This server is active on port 3000.");
})