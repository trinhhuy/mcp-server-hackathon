import axios from 'axios';
import { logger } from '../logger.js';

/**
 * Add a tag to a feature
 * @param featureName Name of the feature to add the tag to
 * @param tagType Type of the tag
 * @param tagValue Value of the tag
 * @returns True if tag was added successfully, false otherwise
 */
export async function getDocs(
  message: string,
) {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:5670/api/v2/chat/completions',
      headers: {
        // 'Authorization': 'Beare 3Rfyuk48FtKEyU3xkYtfvqBBfxYMz',
        'Authorization': 'Beare sk-rsgsccrkwmgqijtqpmgmbtcmdrabhjbnltwquvlztzwaiktn',
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'frontend_lang=vi_VN'
      },
      data: {
        messages: message,
        model: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        // chat_mode: 'chat_knowledge',
        // chat_param: 'Ocell_Docs'
      }
    });
    
    return response.data;
  } catch (error) {
    logger.error(`Error get Ocell Docs ${message}:`, error);
    return null;
  }
} 