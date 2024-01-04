import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RegisterConfirmationCodeDTO {
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}

export class LoginDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginWithGoogleDTO {
  @IsEmail()
  email: string;

  @IsString()
  idToken: string;
}

export class ResetPasswordLinkDTO {
  @IsEmail()
  email: string;
}

export class ResetPasswordDTO {
	@IsEmail()
	email: string

	@IsString()
	password: string
}