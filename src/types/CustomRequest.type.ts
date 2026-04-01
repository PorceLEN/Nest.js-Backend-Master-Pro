import { User } from "src/users/entities/user.entity";
import { Request } from "express";

export type CustomRequest = Request & { user: User }