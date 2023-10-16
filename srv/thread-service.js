const cds = require('@sap/cds');
const { log } = require('console');

module.exports = (srv) => {
    // srv.on('deleteThread', async(req) => {
    //     const { ID } = req.data;
    //     const tx = cds.transaction(req);
    //     const { Threads, Answers } = tx.entities;
    //     const [thread, _] = await tx.read(Threads).where({ID});

    //     if (!thread){
    //         return req.reject(404, "thread not found");
    //         // return {
    //         //     code: 404,
    //         //     message: "thread not found",
    //         //     status: "Error"
    //         // }
    //     }

    //     const hasAnswers = await tx.read(Answers).where({thread_ID : ID});

    //     if(hasAnswers.length === 0) {
    //         await tx.run(DELETE.from(Threads).where({ ID }));
    //         return {
    //             code: 200,
    //             message: "thread deleted",
    //             status: "Success"
    //         }
    //     }
    // })

    // srv.on('upVoteThread', async (req) => {
    //     const { ID } = req.data;
        
    //     const tx = cds.transaction(req);

    //     const { Threads } = tx.entities;
    //     const [thread, _] = await tx.read(Threads).where({ID});

    //     if(!thread){
    //         req.reject(404, "thread not found")
    //     }

    //     await tx.update(Threads)
    //             .set({ upvotes: thread.upvotes++ })
    //             .where({ ID });
    //     return {
    //         code: 200,
    //         message: "up voted successfully",
    //         status: "Success"
    //     }
    // })

    // srv.on('downVoteThread', async (req) => {
    //     const { ID } = req.data;
        
    //     const tx = cds.transaction(req);

    //     const { Threads } = tx.entities;
    //     const [thread, _] = await tx.read(Threads).where({ID});

    //     if(!thread){
    //         req.reject(404, "thread not found")
    //     }

    //     await tx.update(Threads)
    //             .set({ upvotes: thread.upvotes-- })
    //             .where({ ID });
    //     return {
    //         code: 200,
    //         message: "down voted successfully",
    //         status: "Success"
    //     }
    // })

    // srv.on('READ', 'Author', async(req,next) => {
    //     const {$search} = req._query;
    //     console.log($search)
    //    return next()
    // })


    srv.after('CREATE', 'Thread', async(req,res) => {
        // console.log(res);
        const userId = res.req.user.ID;
        const {ID}=req

        console.log(ID, userId);
        // console.log("created",ID)

        const tx = cds.transaction(req);

        const { Threads } = tx.entities;
        // // console.log(Threads);

        // const [thread, _] = await tx.read(Threads).where({ID});
        const data = await SELECT.from(Threads).where({ID})
        // await UPDATE.entity(Threads).with({
        //     title: ""
        // }).where({ID})

        // console.log("thread: ",data);
        // const updatedThread = UPDATE `Threads`.set `author_ID = ${userId}` .where `ID=${ID}`

        // const updatedThread = await tx.update(Threads)
        //         .set({ author_ID: userId })
        //         .where({ ID });

        const updatedThread = await UPDATE (Threads,ID) .with ({
            author_ID: userId
          })

        console.log("updatedThread ", updatedThread);
        
        return
   
    //  const {ID} = req;
    //  const tx = cds.transaction(req);
    //   const { Threads, Authors } = tx.entities;
   
      
    //  // TODO-get thread where id is equalto thread
    //   const [thread, _] = await tx.read(Threads).where({ID});
    //  console.log(thread);
   
   //TODO-if 
   
       
       
       })

}
