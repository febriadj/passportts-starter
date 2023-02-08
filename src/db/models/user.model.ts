import { model, Schema, Document } from 'mongoose';

interface IUserDoc extends Document {
  _id?: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string | null;
  providerId: string | null;
  provider: string;
  createdAt?: Schema.Types.Date;
  updatedAt?: Schema.Types.Date;
}

const UserSchema = new Schema<IUserDoc>(
  {
    username: {
      type: Schema.Types.String,
      trim: true,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 32,
      default: '',
    },
    email: {
      type: Schema.Types.String,
      trim: true,
      required: true,
      unique: true,
      default: '',
    },
    password: {
      type: Schema.Types.String,
      default: null,
    },
    providerId: {
      type: Schema.Types.String,
      unique: true,
      default: null,
    },
    provider: {
      type: Schema.Types.String,
      required: true,
      default: 'local',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model<IUserDoc>('users', UserSchema);

export default UserModel;
