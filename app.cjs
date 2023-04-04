const exp = require("express");
const app = exp();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const ejs = require("ejs");
app.set("view engine", "ejs");

app.use(exp.static("public"));

const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://rakesh:Rakesh2001@cluster0.wwa1wrm.mongodb.net/blogPostDB");

const postSchema=new mongoose.Schema({
    title:String,
    content:String
})

const newPost=mongoose.model("Post",postSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts=[];

app.get("/",function(req,res){
    newPost.find()
    .then((posts)=>{
        res.render('home',{
            homeContent:homeStartingContent, 
            newContent: posts
        });
        
    })
    .catch(err=>{
        console.log(err);
    })

    // we are passing the array of objects in the render method so that we can send all the new posts each time 
    //combined with the old posts
})

app.get("/posts/:postTitle",function(req,res){
    const id=req.params.postTitle;
    newPost.findOne({_id:id})
    .then((post)=>{
        res.render('post',{
            postTitle:post.title,
            postContent:post.content
        });
    })
    .catch(err=>{
        console.log(err);
    })
    
    
// this is used to go to pages like posts/post1 posts/post2 posts/post3
//req.params console logs the everything that has a : before them and it is a js object so we can tap into its variables.
})
 
app.get("/about",function(req,res){
    res.render('about',{aboutContent:aboutContent});
})

app.get("/contact",function(req,res){
    res.render('contact',{contactContent:contactContent});
})

app.get("/compose",function(req,res){
    res.render('compose');
})


app.post("/compose",function(req,res){
    const post=new newPost({
        title : req.body.postTitle,
        content : req.body.postBody
    });
    post.save();
    res.redirect("/");
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
