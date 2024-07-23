// src/auth/dto/user-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1, description: 'The user ID' })
  id: number;

  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  username: string;
}
