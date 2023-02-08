import { Response } from 'express';

interface IHttpResponseOptions {
  res: Response;
  statusCode?: number;
  message?: string | null;
  payload?: object | null;
}

type THttpResponse = (options: IHttpResponseOptions) => void;

/**
 * HTTP Response Success.
 * @param {IHttpResponseOptions} options
 */
export const onSuccess: THttpResponse = ({
  res,
  statusCode = 200,
  message = null,
  payload = null,
}) => {
  res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};

/**
 * HTTP Response Error.
 * @param {IResponseOptions} options
 */
export const onError: THttpResponse = ({
  res,
  statusCode = 500,
  message = null,
  payload = null,
}) => {
  res.status(statusCode).json({
    success: false,
    message,
    payload,
  });
};
