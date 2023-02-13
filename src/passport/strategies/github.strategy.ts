import { IVerifyOptions } from 'passport-local';
import { Strategy as GithubStrategy, Profile } from 'passport-github2';
import User from '../../db/models/user.model';
import uniqueid from '../../helpers/uniqueid.helper';

type TDone = (
  error: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  user: Express.User | false,
  options?: IVerifyOptions
) => void;

const strategy = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: '/api/v1/auth/github/callback',
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: TDone
  ): Promise<void> => {
    try {
      const { id, provider, username } = profile;

      // find user document by providerId and provider name.
      const user = await User.findOne({
        'providers.providerId': id,
        'providers.provider': provider,
      });

      if (!user) {
        // generate an unique id number for username suffix.
        const suffix = await uniqueid(6, {
          uppercase: false,
          lowercase: false,
        });

        const createUser = await new User({
          username: `${username}-${suffix}`,
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
