import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  spotifyId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsOptional()
  @IsUrl()
  albumArt?: string;

  @IsOptional()
  @IsUrl()
  previewUrl?: string;
}
