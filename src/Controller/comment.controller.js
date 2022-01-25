const { postComment } = require('../Service/comment.service');

const AddComment = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const comment = await postComment(req.body, userId);
        res.send({comment});
    }
    catch (error) {
        console.log(error);
        res.send({
            error
        })
    }
};

module.exports = {
    AddComment
}