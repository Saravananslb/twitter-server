const { postTweet, getUserTweet, postLike, deleteTweet, reTweet, getAllReTweets, getLikedTweet } = require('../Service/tweet.service');

const createTweet = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const createdTweet = await postTweet(req.body, userId);
        res.send({
            status: true,
            createdTweet
        })
        return;
    }
    catch (error) {
        console.log(error);
        res.send({
            status: false,
            error
        })
    }
}

const getTweet = async(req, res) => {
    try {
        let newTweet;
        const userId = res.locals.userId;
        const tweetId = req.query.tweetId || undefined;
        const tweet = await getUserTweet(tweetId, (req.query.user == 'me') ? userId : undefined );
        
        const _tweet = JSON.parse(JSON.stringify(tweet));
        if (userId) {
            newTweet = _tweet.map(item => {
                if (item.like.includes(userId)) {
                    item.isLiked = true
                }
                return item
            })
        }
        res.send({
            status: true,
            tweet: newTweet ? newTweet : tweet
        })
        return;
    }
    catch (error) {
        console.log(error);
        res.send({
            status: false,
            error
        })
    }
}

const likeTweet = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const tweetId = req.body.tweetId;
        const likes = await postLike(tweetId, userId);
        res.send({
            status: true,
            likes
        })
        return;
    }
    catch (error) {
        console.log(error);
        res.send({
            status: false,
            error
        })
    }
}

const removeTweet = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const tweetId = req.body.tweetId;
        const status = await deleteTweet(userId, tweetId);
        res.send({
            status
        })
        return;
    }
    catch (error) {
        console.log(error);
        res.send({
            status: false,
            error
        })
    }
}

const retweet = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const tweetId = req.body.tweetId;
        const status = await reTweet(userId, tweetId);
        res.send({
            status
        })
        return;
    }
    catch (error) {
        console.log(error);
        res.send({
            status: false,
            error
        })
    }
}

const getUserReTweet = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const status = await getAllReTweets(userId);
        res.send({
            status
        })
        return;
    }
    catch (error) {
        console.log(error);
        res.send({
            status: false,
            error
        })
    }
}

const getUserLikedTweet = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const status = await getLikedTweet(userId);
        res.send({
            status
        })
        return;
    }
    catch (error) {
        console.log(error);
        res.send({
            status: false,
            error
        })
    }
}

module.exports = {
    createTweet,
    getTweet,
    likeTweet,
    removeTweet,
    retweet,
    getUserReTweet,
    getUserLikedTweet
}