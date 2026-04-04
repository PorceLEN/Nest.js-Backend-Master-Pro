import { User } from "../users/entities/user.entity";
import { Request } from "express";

export type CustomRequest = Request & { user: User }