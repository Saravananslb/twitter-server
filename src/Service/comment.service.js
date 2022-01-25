const commentModel = require('../Models/comment.model');
const tweetModel = require('../Models/tweet.model');

const postComment = async(payload, userId) => {
    try {
        const comment = await commentModel({ ...payload, userId });
        const created = await comment.save();
        await tweetModel.updateOne({ _id: payload.tweetId }, { $push: {commentIds: created._id.toString()}} )
        return created._id;
    }
    catch (error) {
        console.log(error);
        return ''
    }
};

module.exports = {
    postComment
}