// to add changes to github use these:
    // git add .
    // git commit -m "your message"
    // git push
import express from "express";

const app = express();

// array for temporarily storing posts, will dissapear when we restart the server
let posts = [];

// use browser to access files in public css folder
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 3000;

app.set("view engine", "ejs");

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    // pass posts array to EJS to display blog posts on the home page
    res.render("index", { posts: posts });
});

// POST route used to create a new post
app.post("/posts", (req, res) => {
    // create a new post object with the data from the request body
    const newPost = {
        id: Date.now(),
        // get name of creator, title, and content from the request body
        creator: req.body.creator,
        title: req.body.title,
        content: req.body.blog,
        date: new Date()
    };

    // push post into server side array
    posts.push(newPost);

    // send user back to the home page after they submit a post
    res.redirect("/");
});

// route used for editing a specific post
app.get("/posts/:id/edit", (req, res) => {

    const postId = Number(req.params.id);

    const post = posts.find(post => post.id === postId);

    // open file edit.ejs and give it the post we found
    res.render("edit", { post: post });

});

// route used to save changes to a specific post
app.post("/posts/:id/edit", (req, res) => {

    const postId = Number(req.params.id);

    const post = posts.find(post => post.id === postId);

    // takes new info and updates original post object with new info
    post.creator = req.body.creator;
    post.title = req.body.title;
    post.content = req.body.blog;

    // redirect back to the home page after saving changes
    res.redirect("/");
});

// route used to delete a specific post
app.post("/posts/:id/delete", (req, res) => {

    const postId = Number(req.params.id);

    posts = posts.filter(post => post.id !== postId);

    // redirect back to the home page after deleting the post
    res.redirect("/");
});
