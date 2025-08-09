import { catchAsync } from '../../utils/catchAsync';
import { authServices } from './auth.service';

const userRegistration = catchAsync(async (req, res) => {
  const result = await authServices.userRegistrationIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: 'user registered successfully',
    data: result,
  });
});

const userLogin = catchAsync(async (req, res) => {
  const result = await authServices.userLoginIntoDB(req.body);

  res.status(200).json({
    success: true,
    message: 'user logged successfully',
    data: result,
  });
});

export const authControllers = {
  userRegistration,
  userLogin,
};
