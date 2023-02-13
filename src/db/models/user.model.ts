import { model, Schema, Document } from 'mongoose';

export interface IProviders {
  providerId: string;
  provider: string;
}

export interface IUserDoc extends Document {
  _id?: Schema.Types.ObjectId;
  username: string;
  email: string | null;
  password: string | null;
  providers: Array<IProviders> | Array<undefined>;
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
      unique: true,
      default: null,
    },
    providers: {
      type: Schema.Types.Array,
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model<IUserDoc>('users', UserSchema);

export default UserModel;
