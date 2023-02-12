export interface IUniqueIdOptions {
  uppercase?: boolean;
  lowercase?: boolean;
  number?: boolean;
}

export type TUniqueId = (
  length: number,
  options?: IUniqueIdOptions
) => Promise<string>;

/**
 * Generate unique and customizable ID asynchronously.
 * @param {number} length
 * @param {IUniqueIdOptions} options
 * @returns {string} unique ID.
 */
const uniqueId: TUniqueId = async (length, options) => {
  let schema = '';

  if (options?.uppercase ?? true) schema += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options?.lowercase ?? true) schema += 'abcdefghijklmnopqrstuvwxyz';
  if (options?.number ?? true) schema += '0123456789';

  let unique = '';
  let i = 0;

  while (i < length) {
    unique += schema.charAt(Math.floor(Math.random() * schema.length));
    i += 1;
  }

  return unique;
};

export default uniqueId;
