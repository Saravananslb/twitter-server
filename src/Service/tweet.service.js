const tweetModel = require('../Models/tweet.model');
const userModel = require('../Models/users.model');
const readFile = require('../Utils/readFile');

const postTweet = async(payload, userId) => {
    try {
        const posts = new tweetModel({ ...payload, userId: userId});
        const res = await posts.save();
        return res._id;
    }
    catch {
        return
    }
}

const getUserTweet = async(tweetId, userId) => {
    let tweet;
    if (tweetId) {
        tweet = await tweetModel.findById(tweetId);
    }
    else if (userId) {
        tweet = await tweetModel.find({ userId: userId });
    }
    else{
        tweet = await tweetModel.find();
    } 
    tweet.map(item => { 
        if (item.asset) item.asset = readFile(item.asset)
    })   
    return tweet;
}

const postLike = async(tweetId, userId) => {
    try {
        let newLike;
        const likes = await tweetModel.findById(tweetId);
        if (!likes) return false;

        const isLiked = likes.like.includes(userId);
        if (isLiked) {
            newLike = likes.like.filter(item => userId !== item);
        }
        else {
            newLike = [...likes.like, userId];
        }
        const updatedLike = await tweetModel.findOneAndUpdate({ _id: tweetId }, { like: newLike })
        return !isLiked;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const deleteTweet = async (userId, tweetId) => {
    try {
        const tweet = await tweetModel.deleteOne({ _id: tweetId, userId: userId });
        return tweet.deletedCount;
    }
    catch (error) {
        console.log(error);
        return false;
    }
    
}

const reTweet = async(userId, tweetId) => {
    try {
        let newTweet;
        const user = await userModel.findById(userId);
        const isTweeted = user.reTweet.includes(tweetId);
        if (isTweeted) {
            newTweet = user.reTweet.filter(item => item !== userId);
        }
        else {
            newTweet = [...user.reTweet, userId];
        }
        await userModel.findByIdAndUpdate(userId, { reTweet: newTweet })
        return true;
    }
    catch (error) {
        console.log(error);
        return false
    }
}

const getAllReTweets = async(userId) => {
    try {
        const user = await userModel.findOne({ _id: userId });
        if (user.reTweet) {
            const tweetIds = user.reTweet;
            const tweet = await tweetModel.find({ id: { $in: tweetIds }});
            return tweet;
        }
        return [];

    }
    catch(error) {
        console.log(error);
        return [];
    }
}

const getLikedTweet = async(userId) => {
    try {
        const tweet = await tweetModel.findOne({ like: userId });
        return tweet;
    }
    catch(error) {
        console.log(error);
        return [];
    }
}

module.exports = {
    postTweet,
    getUserTweet,
    postLike,
    deleteTweet,
    reTweet,
    getAllReTweets,
    getLikedTweet
}