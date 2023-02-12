import { Request, Response, NextFunction as Next } from 'express';
import passport from 'passport';
import generateToken from '../helpers/generate-token.helper';
import * as httpRes from '../helpers/http-response.helper';
import config from '../config';

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

/**
 * Router controller for OAuth authentication callback.
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const oauth: TController = async (req, res, next) => {
  const { originalUrl: url } = req;
  const strategy: string = url.split('/').reverse()[1];

  const successUrl = `${config.clientHost}${config.oauth.successRedirect}`;
  const failureUrl = `${config.clientHost}${config.oauth.failureRedirect}`;

  passport.authenticate(
    strategy,
    { session: false },
    async (err, user): Promise<void> => {
      if (err) {
        res.redirect(failureUrl);
        return;
      }

      const token: string = await generateToken(user._id);
      // set cookie.
      res.cookie('x-auth-cookie', token);
      res.redirect(successUrl);
    }
  )(req, res, next);
};
