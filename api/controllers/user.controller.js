import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
  res.json({
    message: 'Hello world'
  });
}

export const updateUser = async (req, res, next) => {
  if(req.user.id !== req.params.id){
    return next(errorHandler('401', 'You can only update your own account'))
  }
  try {
    if(req.body.password){
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      }
    }, {new: true})

    const {password, ...rest} = updatedUser._doc
    res.status(200).json(rest)            
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next ) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your account'))
  try {
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token').status(200).json('Account has been deleted');
  } catch (error) {
    next(error)
  }
}

export const getUserListings = async (req, res, next) => {
  // console.log(req.params.id);

  try {
    // Check if the authenticated user matches the requested user ID
    if (req.user.id === req.params.id) {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } else {
      // If there's a mismatch, return a 401 Unauthorized error
      throw errorHandler(401, 'You can only show your own listings');
    }
  } catch (error) {
    // Handle other errors and pass them to the error-handling middleware
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if(!user) return next(errorHandler(404, 'User not found'))

    const {password:pass, ...rest} = user._doc
    
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}