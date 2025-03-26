import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  @IsUUID()
  songId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}

export class ToggleFavoriteDto {
  @IsNotEmpty()
  @IsUUID()
  songId: string;
}
