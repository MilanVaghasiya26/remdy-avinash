import { Request, Response } from "express";
import { ApiResponseDto } from "../dto/res";
import { CreateEditorContentRequestDto } from "../dtos/admin/EditorContent/req/create.editor.content.request.dto";
import { EditorContentService } from "../services";

const editorContentService = new EditorContentService();

export class EditorContentController {
  async createContent(req: Request, res: Response): Promise<Response> {
    try {
      const contentDto: CreateEditorContentRequestDto = req.body;

      if (
        !contentDto.title ||
        !contentDto.type ||
        !contentDto.htmlContent ||
        !contentDto.createdBy
      ) {
        return res
          .status(400)
          .json(new ApiResponseDto(false, "Missing required fields"));
      }

      const savedContent = await editorContentService.createContent(contentDto);

      if (!savedContent) {
        return res
          .status(400)
          .json(new ApiResponseDto(false, "Failed to create content"));
      }

      return res
        .status(201)
        .json(
          new ApiResponseDto(true, "Content created successfully", savedContent)
        );
    } catch (error) {
      console.error("Error creating content:", error);
      return res
        .status(500)
        .json(new ApiResponseDto(false, "Error while saving content", error));
    }
  }
}
