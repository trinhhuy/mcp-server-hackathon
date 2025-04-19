/**
 * Get flag details tool for Unleash MCP Server
 */

import { z } from 'zod';
import { getDocs } from '../ocell/get-docs.js';

export const GetDocParamsSchema = {
  message: z.string()
};

export async function handleGetDoc({ message }: { message?: string }) {
  try {
    // Get the feature flag
    const result = await getDocs(message || 'Lấy tất cả tài liệu của Ocell');
    if (!result) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            success: false,
            message,
            error: `Message '${message}' not found`
          }, null, 2)
        }],
        isError: true
      };
    }
    // xu ly result 1 chut content
    let tempChoices: any[] = []
    let choices = result.choices;
    choices.forEach((choice: { index: number, finish_reason: any, message: { content: string, role: string } }) => {
      let temp = {...choice}
      const content = choice.message.content;
      // Tìm phần văn bản sau dấu ``` cuối cùng
      const lastCodeBlockIndex = content.lastIndexOf('```');
      if (lastCodeBlockIndex !== -1) {
        temp.message.content = content.substring(lastCodeBlockIndex + 3).trim();
      }
      tempChoices.push(temp)
    });
    
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          success: true,
          result: {
            ...result,
            choices: tempChoices
          }
        }, null, 2)
      }]
    };
  } catch (error: any) {
    return {
      content: [{ 
        type: "text", 
        text: JSON.stringify({ 
          success: false,
          message,
          error: error.message 
        }, null, 2)
      }],
      isError: true
    };
  }
}

/**
 * Tool definition for getFlag
 */
export const getOcellDocTool = {
  name: "getDoc",
  description: "Get doc",
  paramsSchema: GetDocParamsSchema,
  handler: handleGetDoc
}; 