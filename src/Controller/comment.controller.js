const { postComment, GetComments } = require('../Service/comment.service');

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

const GetComment = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const tweetId = req.query.tweetId;
        const comment = await GetComments(tweetId, userId);
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
    AddComment,
    GetComment
}