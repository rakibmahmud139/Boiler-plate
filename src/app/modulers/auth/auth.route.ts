import express from 'express';
import { authControllers } from './auth.controller';
import { authValidation } from './auth.validation';
import { validationRequest } from '../../middlewares/validationRequest';

const router = express.Router();

router.post(
  '/register',
  validationRequest(authValidation.userRegistrationValidationSchema),
  authControllers.userRegistration,
);

router.post(
  '/login',
  validationRequest(authValidation.userLoginValidationSchema),
  authControllers.userLogin,
);

export const authRoute = router;
