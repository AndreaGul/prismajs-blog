const { PrismaClient } = require("@prisma/client");

 const prisma = new PrismaClient();

 const createPost = (data, callbackf) =>{
    // Creare un post
    prisma.post.create({data})
    .then( newPost => callbackf(newPost))
    .catch(err=> console.error(err));
 }

 module.export = {
    createPost,
 }