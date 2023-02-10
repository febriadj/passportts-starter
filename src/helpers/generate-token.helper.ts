import jwt from 'jsonwebtoken';

type TGenerateToken = (id: string) => Promise<string>;

/**
 * Generate new token.
 * @param {Promise.<string>} id
 * @returns token
 */
const generate: TGenerateToken = async (id) => {
  const privateKey: string = process.env.JWT_PRIVATE_KEY || 'shhhh';
  const options: jwt.SignOptions = {
    expiresIn: '1m',
  };

  // generate access token.
  return jwt.sign({ id }, privateKey, options);
};

export default generate;
