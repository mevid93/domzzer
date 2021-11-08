import { Schema, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { User } from '../types/types';


const userSchema = new Schema<User>({
  username: {
    type: String,
    minlength: [4, 'field length must be at least 4 characters!'],
    required: [true, 'field is required!'],
    unique: true,
  },
  userRole: {
    type: String,
    enum: ['LITE', 'PRO', 'ADMIN'],
    default: 'LITE',
    required: [true, 'field is required!']
  },
  passwordHash: {
    type: String,
    required: [true, 'field is required!']
  }
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

userSchema.plugin(mongooseUniqueValidator, { message: 'field must be unique!' });

export default model<User>('User', userSchema);