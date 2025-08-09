import { TLoginUser, TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcryptjs';
import { createToken } from './auth.utils';
import config from '../../config';

const userRegistrationIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const userLoginIntoDB = async (payload: TLoginUser) => {
  const { email } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Your password is wrong !!');
  }
  const jwtPayload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    profile: user.profile,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_token_expires_in as string,
  );

  const { username } = user;
  const userData = { username, email };

  return {
    user: userData,
    token,
  };
};

export const authServices = {
  userRegistrationIntoDB,
  userLoginIntoDB,
};
