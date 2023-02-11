import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../../db/models/user.model';

const strategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done): Promise<void> => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('User not exist');
      }

      // compare password.
      if (!(await bcrypt.compare(password, user.password || ''))) {
        throw new Error('Invalid password');
      }

      done(null, user, {
        message: 'Login successful',
      });
    } catch (err) {
      if (err instanceof Error) {
        const { message } = err;

        done(err, false, {
          message,
        });
      }
    }
  }
);

export default strategy;
