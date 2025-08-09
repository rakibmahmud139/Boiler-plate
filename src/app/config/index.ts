import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL as string,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRE_IN,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
