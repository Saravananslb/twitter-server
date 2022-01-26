const commentModel = require('../Models/comment.model');
const tweetModel = require('../Models/tweet.model');
const usersModel = require('../Models/users.model');

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

const GetComments = async(tweetId, userId) => {
    try {
        const userObj = {}
        const users = await usersModel.find();
        users.map(item => {
            if (!userObj[item._id]) {
                userObj[item._id] = item
            }
        });
        const comments = await commentModel.find({ tweetId: tweetId });
        const comment = JSON.parse(JSON.stringify(comments));
        const newComments = comment.map(item => {
            // if (userObj[item.userId] == item.userId) {
                item.userName = userObj[item.userId].name || userObj[item.userId].email;
            // }
            return item;
        })
        return newComments;
    }
    catch (error) {
        console.log(error);
        return ''
    }
};

module.exports = {
    postComment,
    GetComments
}