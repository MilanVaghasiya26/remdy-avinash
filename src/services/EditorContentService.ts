import { getDataSource } from "../config/database";
import { CreateEditorContentRequestDto } from "../dtos/admin/EditorContent/req/create.editor.content.request.dto";
import { EditorContent } from "../entities/EditorContent";
import { User } from "../entities/User";

export class EditorContentService {
  async createContent(
    contentDto: CreateEditorContentRequestDto
  ): Promise<EditorContent | null> {
    const contentRepository = getDataSource().getRepository(EditorContent);
    const userRepository = getDataSource().getRepository(User);

    try {
      // Validate user exists
      const user = await userRepository.findOne({
        where: { id: contentDto.createdBy },
      });
      if (!user) {
        throw new Error("Invalid user ID");
      }

      const newContent = contentRepository.create({
        title: contentDto.title,
        type: contentDto.type,
        html_content: contentDto.htmlContent,
        status: contentDto.status,
        created_by: user,
        updated_by: user,
      });

      return await contentRepository.save(newContent);
    } catch (error) {
      console.error("Error saving content:", error);
      return null;
    }
  }
}
