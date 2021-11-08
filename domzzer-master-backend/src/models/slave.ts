import { Schema, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { Slave } from '../types/types';


const slaveSchema = new Schema<Slave>({
  name: {
    type: String,
    minlength: [3, 'field length must be at least 3 characters!'],
    required: [true, 'field is required!'],
    unique: true
  },
  address: {
    type: String,
    minlength: [10, 'field length must be at least 10 characters!'],
    required: [true, 'field is required!'],
    unique: true
  },
  status: {
    type: String,
    minlength: [5, 'field length must be at least 5 characters!'],
    required: [true, 'field is required!']
  },
  testsDone: {
    type: Number,
    minimum: [0, 'field value must be at least 0!'],
    required: [true, 'field is required!']
  },
  vulnerabilitiesFound: {
    type: Number,
    minimum: [0, 'field value must be at least 0!'],
    required: [true, 'field is required!']
  },
  username: {
    type: String,
    required: [function (this: Slave) { return this.password !== undefined; }, 'field is required when password is defined!']
  },
  password: {
    type: String,
    required: [function (this: Slave) { return this.username !== undefined; }, 'field is required when username is defined!']
  }
});

slaveSchema.plugin(mongooseUniqueValidator, { message: 'field must be unique!' });

slaveSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model<Slave>('Slave', slaveSchema);