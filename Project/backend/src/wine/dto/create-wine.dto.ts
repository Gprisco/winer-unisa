export class CreateWineDto {
  wine: string;
  vintage: number;
  winefamilyId: number;
  wineryId: number;
  winegrapeIds: number[];
}
