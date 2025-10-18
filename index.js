const express = require("express");
const app = express();  
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/Chat.js");
const methodOverride = require("methodOverride");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
main()
    .then(() => {
        console.log("connection successful!!")
     })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index routes
app.get("/chats", async (req, res)=> {
    let Chats = await Chat.find();
    console.log(Chats)
    res.render("index.ejs", {Chats});
});


//New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//Create Route
app.post("/chats", (req, res) => {
    let {from, to, message} = req.body;
    let newChat = new Chat({
         from : from,
         to : to,
         message : message,
         created_at : new Date()
    });

    newChat
    .save()
    .then (res => {
    console.log("Chat was Saved succeefully!");
    }).catch (err => {
    console.log(err);
    });

    res.redirect("/chats");

    // console.log(newChat);
});
//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render = ("edit.ejs", { chat });
});
//Update Route
app.put("/chats/:id", async(req, res) => {
    let {id} = req.params;
    let {newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{message : newMsg},
    {runValidators: true, new: true}
    );

    console.log(updatedChat);
    res.redirect("/chats");
});
app.get("/", (req, res) => {
    res.send("root is working");
})
app.listen(8080, () => {
    console.log("server is listening on port 8080");
});