import { ContentType } from "../../../../enums";

export class CreateEditorContentRequestDto {
  title!: string;
  type!: ContentType;
  htmlContent!: string;
  status!: boolean;
  createdBy!: number; // User ID
}
