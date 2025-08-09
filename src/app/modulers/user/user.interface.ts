export type TUser = {
  username: string;
  email: string;
  password: string;
  profile: string;
  role: 'salesman' | 'manager';
};

export type TLoginUser = {
  email: string;
  password: string;
};
