import { Schema, model, Document } from 'mongoose';
import { IUser } from './type';
import { UserRoles } from './enum';


const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: UserRoles.USER,
    enum: UserRoles
  }
}, {
  timestamps: true 
});

// Creating a relation between user and task table
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = model<IUser>('User', userSchema);

export default User;
