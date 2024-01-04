export interface IUser {
  email: string;
  password: string;
}

export interface IUserReq {
  userId: string;
  email: string;
}

export interface IUserData extends IUserReq {
  iat: number;
  exp: number;
}

export interface AuthServiceProvider {
  validateUser(details: IUser): Promise<IUser>;
  createUser(details: IUser): Promise<IUser>;
}

export type Done = (err: Error, user: IUser) => void;

export interface IMessageResponse {
  message: string;
}

export interface ITokenResponse {
  token: string;
}

export interface ISuccessResponse {
  success: boolean;
}
