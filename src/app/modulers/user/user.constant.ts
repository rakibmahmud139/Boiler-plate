const USER_ROLE = {
  salesman: 'salesman',
  manager: 'manager',
} as const;

export type TUserRole = keyof typeof USER_ROLE;
