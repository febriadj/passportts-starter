import { Request, Response, NextFunction as Next } from 'express';
import bcrypt from 'bcryptjs';
import * as httpRes from '../helpers/http-response.helper';
import User from '../db/models/user.model';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Router controller for user registration.
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const register: TController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // hash password.
    const hashed = await bcrypt.hash(password, await bcrypt.genSalt(10));

    const user = await new User({
      username: username,
      email: email,
      // store hashed password.
      password: hashed,
    }).save();

    httpRes.onSuccess({
      res,
      statusCode: 201,
      payload: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      httpRes.onError({
        res,
        statusCode: 401,
        message: err.message,
      });
    }
  }
};
