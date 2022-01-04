const express = require('express'); // Import express
const router = express.Router(); // Create a router
const Post = require('../models/Post'); // Import Post model
const fs = require('fs'); // Import File System module

// RETRIEVES ALL POSTS FROM DATABASE
router.get('/', async (req, res)=>{
    try {
        const posts = await Post.find(); // select all posts
        res.json(posts); // send the posts
    } catch(err) {
        res.json({ message: err });
    }
});

// SUBMITS A POST TO DATABASE
router.post('/', async (req, res)=>{
    // console.log(req.body);
    // Create new instance of Post
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await post.save(); // save the post
        fs.appendFile('./data/db/posts.json', ',\n' + JSON.stringify(savedPost), (err)=>{
            if (err)
                console.log(err);
            else
                console.log('New post added to file!');
        });
        res.json(savedPost);
    } catch(err) {
        res.json({ message: err }); // show error if post not saved
    }
});

// RETRIEVE SPECIFIC POST FROM DATABASE
router.get('/:postId', async (req, res)=>{
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
        // fs.createReadStream(res.json(post)).pipe(fs.createWriteStream('../data/db/test.json'));
    } catch(err) {
        res.json({ message: err });
    }
});

// DELETE POST FROM DATABASE
router.delete('/:postId', async (req, res)=>{
    try {
        const removePost = await Post.remove({ _id: req.params.postId });
        res.json(removePost);
    } catch(err) {
        res.json({ message: err });
    }
});

// UPDATE A POST
router.patch('/:postId', async (req, res)=>{
    try {
        const updatePost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title } });
        res.json(updatePost);
    } catch(err) {
        res.json({ message: err });
    }
});



module.exports = router; // Export router

// router.post('/', (req, res)=>{
//     // console.log(req.body);
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });

//     post.save()
//     .then(data => {
//         res.status(200).json(data);
//     })
//     .catch(err => {
//         res.json({ message: err });
//     });
// });

// module.exports = router; // Export router