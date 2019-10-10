import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR: number = 10;

export const encryptPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (candidatePassword: string, storedPassword:string): boolean => {
  return bcrypt.compareSync(candidatePassword, storedPassword);
};
