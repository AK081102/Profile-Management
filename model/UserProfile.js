const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming this references your User model
    required: true,
    unique: true // Ensures each user has only one profile
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age must be at least 0'],
    max: [150, 'Age must be at most 150']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['male', 'female', 'other'],
      message: 'Gender must be male, female, or other'
    }
  },
  phoneno: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Phone number should be 10 digits']
  },
  dob: {
    type: String,
    required: [true, 'Date of birth is required'],
    match: [/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, 'Invalid date format. Please use dd-mm-yyyy.']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    match: [/^\d{6}$/, 'Pincode should be 6 digits']
  },
  occupation: {
    type: String,
    required: false
  },
  companyname: {
    type: String,
    required: false
  },
  degree: {
    type: String,
    required: false,
    enum: {
      values: ['be', 'btech', 'bsc', 'bca', 'other'],
      message: 'Degree must be one of be, btech, bsc, bca, or other'
    }
  },
  dpt: {
    type: String,
    required: false,
    enum: {
      values: ['cse', 'it', 'ece', 'eee', 'mech', 'other'],
      message: 'Department must be one of cse, it, ece, eee, mech, or other'
    }
  },
  twelthmark: {
    type: Number,
    required: [true, '12th mark is required'],
    min: [0, '12th mark must be at least 0'],
    max: [100, '12th mark must be at most 100'],
    validate: {
      validator: Number.isFinite,
      message: '12th mark must be a number'
    }
  },
  tenthmark: {
    type: Number,
    required: false,
    min: [0, '10th mark must be at least 0'],
    max: [100, '10th mark must be at most 100'],
    validate: {
      validator: Number.isFinite,
      message: '10th mark must be a number'
    }
  }
});

// Indexing user field for uniqueness
userProfileSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);
