import {
  IsString,
  IsEmail,
  //   IsOptional,
  //   IsInt,
  //   Min,
  //   Max,
  //   ValidateNested,
  //   IsArray,
  //   ArrayMinSize,
  //   Matches,
  //   IsNotEmpty,
  //   ValidateIf,
} from 'class-validator';
// import { Type } from 'class-transformer';

export class UserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}

// export class MultipleUserDto {
//   @IsArray()
//   @ArrayMinSize(1, { message: 'At least one user is required' })
//   @ValidateNested({ each: true })
//   @Type(() => UserDto)
//   payload: UserDto[];
// }
