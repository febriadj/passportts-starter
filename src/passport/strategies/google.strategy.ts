import { IVerifyOptions } from 'passport-local';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import User from '../../db/models/user.model';
import uniqueid from '../../helpers/uniqueid.helper';

type TDone = (
  error: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  user: Express.User | false,
  options?: IVerifyOptions
) => void;

const strategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: '/api/v1/auth/google/callback',
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: TDone
  ): Promise<void> => {
    try {
      const { id, provider, _json } = profile;

      // find user document by providerId and provider name.
      const user = await User.findOne({
        'providers.providerId': id,
        'providers.provider': provider,
      });

      if (!user) {
        // email scope is required.
        // passport.authenticate('google', { scope: ['email'] });
        if (!_json.email) {
          throw new Error('Email scope is required');
        }

        // generate an unique id number for username suffix.
        const suffix = await uniqueid(6, {
          uppercase: false,
          lowercase: false,
        });

        const createUser = await new User({
          username: `${_json.email.split('@')[0]}-${suffix}`,
          email: _json.email,
          providers: [
            {
              providerId: id,
              provider,
            },
          ],
        }).save();

        done(null, createUser, {
          message: 'Login successful and new user created',
        });

        return;
      }

      done(null, user, {
        message: 'Login successful',
      });
    } catch (err) {
      if (err instanceof Error) {
        done(err, false, {
          message: err.message,
        });
      }
    }
  }
);

export default strategy;
