const mongoose = require('mongoose');
const validator = require('validator');

const { isEmail } = validator;

//Todo close friend,highlights
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bio: {
      type: String,
      trim: true,
    },
    // email: {
    //   type: String,
    //   trim: true,
    //   unique: true,
    //   validate: [isEmail, 'invalid email'],
    //   required: [true, 'email is required'],
    // },
    // accountType: {
    //   type: String,
    //   enum: ['public', 'private'],
    //   default: 'public',
    // },
    // website: {
    //   type: String,
    // },
    name: {
      type: String,
    },
    // username: {
    //   type: String,
    //   required: [true, 'username is required'],
    //   unique: true,
    // },
    // gender: {
    //   type: String,
    //   select: false,
    // },
    // birthday: {
    //   type: Date,
    //   select: false,
    // },
    // closeFriends: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   select: false,
    // },
    photo: {
        type: String,
    },
    // followers: {
    //   type: Map,
    //   of: {
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Profile',
    //     },
    //   },
    //   default: {},
    // },

    // following: {
    //   type: Map,
    //   of: {
    //     user: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Profile',
    //     },
    //   },
    //   default: {},
    // },

    // requests: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Profile',
    //     select: false,
    //   },
    // ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

profileSchema.set('toObject', { virtuals: true });
profileSchema.set('toJSON', { virtuals: true });

profileSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'profile',
});

profileSchema.pre(/^find/, function (next) {
  this.find().populate('posts');

  next();
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;