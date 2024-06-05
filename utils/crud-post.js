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
            tags: {
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
            tags: {
                select: {
                    name:true
                }
            }
        },
    })
    .then( posts => callbackf(posts))
    .catch(err => console.error(err));
}

const updatePostById=(id,data,callbackf)=>{
    //aggiorna un post
    prisma.post.update({where:{id}, data})
    .then( post => callbackf(post))
    .catch(err=> console.error(err));

}



 module.export = {
    createPost,
    readPostsBySlug,
    readPosts,
    updatePostById,
 }