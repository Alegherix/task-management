import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @MinLength(5)
  @MaxLength(20)
  @IsString()
  username: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain atleast \n 1 Upperchase letter\n 1 Lowercase letter\n 1 Number or special character and be between 8-20 characters.',
  })
  password: string;
}
