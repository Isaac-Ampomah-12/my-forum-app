const cds = require('@sap/cds');
const { log } = require('console');

module.exports = (srv) => {
    srv.on('deleteThread', async(req) => {
        const { ID } = req.data;
        const tx = cds.transaction(req);
        const { Threads, Answers } = tx.entities;
        const [thread, _] = await tx.read(Threads).where({ID});

        if (!thread){
            return req.reject(404, "thread not found");
            // return {
            //     code: 404,
            //     message: "thread not found",
            //     status: "Error"
            // }
        }

        const hasAnswers = await tx.read(Answers).where({thread_ID : ID});

        if(hasAnswers.length === 0) {
            await tx.run(DELETE.from(Threads).where({ ID }));
            return {
                code: 200,
                message: "thread deleted",
                status: "Success"
            }
        }
    })

    srv.on('upVoteThread', async (req) => {
        const { ID } = req.data;
        
        const tx = cds.transaction(req);

        const { Threads } = tx.entities;
        const [thread, _] = await tx.read(Threads).where({ID});

        if(!thread){
            req.reject(404, "thread not found")
        }

        await tx.update(Threads)
                .set({ upvotes: thread.upvotes++ })
                .where({ ID });
        return {
            code: 200,
            message: "up voted successfully",
            status: "Success"
        }
    })

    srv.on('downVoteThread', async (req) => {
        const { ID } = req.data;
        
        const tx = cds.transaction(req);

        const { Threads } = tx.entities;
        const [thread, _] = await tx.read(Threads).where({ID});

        if(!thread){
            req.reject(404, "thread not found")
        }

        await tx.update(Threads)
                .set({ upvotes: thread.upvotes-- })
                .where({ ID });
        return {
            code: 200,
            message: "down voted successfully",
            status: "Success"
        }
    })

}
