import config from '../config';
import { TUserRole } from '../modulers/user/user.constant';
import { User } from '../modulers/user/user.model';
import { catchAsync } from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('Unauthorized access');
    }

    const decoded = jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;

    const { _id, role } = decoded;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error('User not found');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized for this route');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};
