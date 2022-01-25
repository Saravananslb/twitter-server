const usersModel = require('../Models/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRound = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'twitterClone';

const { success, failure } = require('../Utils/helper');

const findUserByEmail = async (email) => {
    try {
        const user = await usersModel.findOne({
            email: email.toLowerCase()
        })
        return user;
    }
    catch (error) {
        console.log(error);
        return;
    }
}

const signUp = async (email, password, name) => {
    try {
        const userCheck = await findUserByEmail(email);
        if (userCheck) return failure({ error: 'user already exists' }, 'user exists, please sign in to continue..')
        const hashPassword = await bcrypt.hash(password, saltRound);
        const userCreate = new usersModel({
            email: email.toLowerCase(),
            password: hashPassword,
            name: name
        });
        const signInUser = await userCreate.save();
        return success({userId: signInUser._id}, 'user created successfully');
    }
    catch (error) {
        console.log(error);
        return failure({error: error}, 'Failed to create user');
    }
}

const signIn = async (email, password) => {
    try {
        const user = await findUserByEmail(email);
    
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                const authToken = jwt.sign({
                    email: user.email,
                    id: user.id
                }, JWT_SECRET, { expiresIn: '10hrs' });
                return success({ authToken: authToken }, 'user logged in successfully')
            }
            return failure({ error: 'wrong password' }, 'incorrect password')
        }
        return failure({ error: 'user not found' }, 'user not found');
    }
    catch (error) {
        console.log(error);
        return failure({error: error}, 'Failed to login user')
    }
}

const getUsers = async(userId) => {
    try {
        let users
        if (userId) users = await usersModel.find({_id: userId}).select('-password');
        else users = await usersModel.find().select('-password');
        return users;
    }
    catch(error) {
        console.log(error);
        return [];
    }
}

const followUser = async(userId, followerId) => {
    try {
        let newFollowers;
        let newFollowing;
        const users = await usersModel.findById(userId);
        console.log(users)
        const followUser = await usersModel.findById(followerId);
        if (!users && !followUser) return { status: true, followStatus: false, message: 'no user found' };
        const followStatus = users.following.includes(followerId);
        if (followStatus) {
            newFollowers = users.following.filter(item => item !== followerId);
            newFollowing = followUser.followers.filter(item => item !== userId);
        }
        else {
            newFollowers = [ ...followUser.followers, userId ];
            newFollowing = [ ...users.following, followerId ];
        }
        await usersModel.findByIdAndUpdate(userId, { following: newFollowing });
        await usersModel.findByIdAndUpdate(followerId, { followers: newFollowers });
        return true;
    }
    catch (error) {
        console.log(error);

    }
}

const updateUser = async(user, userId) => {
    try {
        console.log(user)
        const update = await usersModel.findByIdAndUpdate(userId, user);
        return update;
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    followUser,
    updateUser
}