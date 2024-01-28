import { InvalidUserData } from '../exceptions/invalidUserData';

const validate = (user) => {
  if (typeof user.username !== 'string' || typeof user.password !== 'string') {
    throw new InvalidUserData('Wrong username or password type');
  }
  return user;
};

export default { validate };
