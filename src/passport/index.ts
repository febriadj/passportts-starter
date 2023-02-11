import passport from 'passport';
import mongoose from 'mongoose';
import local from './strategies/local.strategy';

const strategies = (): void => {
  interface IUser {
    _id?: mongoose.Types.ObjectId;
  }

  passport.serializeUser((user: IUser, done): void => done(null, user._id));
  passport.deserializeUser((id: IUser, done): void => done(null, id));

  passport.use(local);
};

export default strategies;
