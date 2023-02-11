import { Request, Response, NextFunction as Next } from 'express';
import passport from 'passport';
import generateToken from '../helpers/generate-token.helper';
import * as httpRes from '../helpers/http-response.helper';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Router controller for local authentication.
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const local: TController = async (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    async (err, user, info): Promise<void> => {
      if (err) {
        httpRes.onError({
          res,
          statusCode: 401,
          message: err.message,
        });
        return;
      }

      const token: string = await generateToken(user._id);
      // set cookie.
      res.cookie('x-auth-cookie', token);

      httpRes.onSuccess({
        res,
        message: info.message,
        payload: user,
      });
    }
  )(req, res, next);
};
