const { getUsers, followUser, updateUser } = require('../Service/user.service');

const getUser = async(req, res) => {
    try {
        let userid;
        const userId = res.locals.userId;
        const user = req.query.user;
        if (user == 'me') userid = userId;
        const users = await getUsers(userid);
        res.send({
            status: true,
            users
        });
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

const followUsers = async(req, res) => {
    try {
        const userId = res.locals.userId;
        const followerId = req.body.followerId;
        if (userId === followerId) {
            res.send({
                status: false,
                message: 'you cannot follow your own profile'
            })
            return;
        }
        const users = await followUser(userId, followerId);
        res.send({
            status: true,
            users
        });
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

const editUser = async(req, res) => {
    try {
        const user = { ...req.body };
        const userId = res.locals.userId;
         if (user.password) delete user.password;
        updated = await updateUser(user, userId);
        res.json({
            updated
        });
        return;
    }
    catch (error) {
        res.json({
            error
        })
        return;
    }
    

}

module.exports = {
    getUser,
    followUsers,
    editUser
}