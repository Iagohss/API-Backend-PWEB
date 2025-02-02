import { Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput{
  id = "";
  name: string;
  email: string;
  password: string;
  admin: boolean;
}