import { IsInt, IsNotEmpty } from "class-validator";

export class CreateFavoriteDto {
  @IsInt()
  @IsNotEmpty()
  songId: number;
}
