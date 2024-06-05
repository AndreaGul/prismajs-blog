const { PrismaClient } = require("@prisma/client");

 const prisma = new PrismaClient();

 const createPost = (data, callbackf) =>{
    // Creare un post
    prisma.post.create({data})
    .then( newPost => callbackf(newPost))
    .catch(err=> console.error(err));
 }

 
const readPostsBySlug = (slug,callbackf) =>{
    //leggiamo posts
    prisma.post.findUnique({
        where:{slug},
        include: {
            category:{
                select:{
                    name:true
                }
            },
            tag: {
                select: {
                    name:true
                }
            }
        },
    })
    .then( posts => callbackf(posts))
    .catch(err => console.error(err));
}

const readPosts = (callbackf) =>{
    //leggiamo posts
    prisma.post.findMany({
        include: {
            category:{
                select:{
                    name:true
                }
            },
            tag: {
                select: {
                    name:true
                }
            }
        },
    })
    .then( posts => callbackf(posts))
    .catch(err => console.error(err));
}


 module.export = {
    createPost,
    readPostsBySlug,
    readPosts,
 }