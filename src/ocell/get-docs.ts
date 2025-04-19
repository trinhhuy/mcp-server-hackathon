import axios from 'axios';
import { logger } from '../logger.js';
import dotenv from 'dotenv';

dotenv.config();

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
      url: `${process.env.OCELL_BASE_URL}/api/v2/chat/completions`,
      headers: {
        'Authorization': `Beare ${process.env.OCELL_API_KEY}`,
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Cookie': 'frontend_lang=vi_VN'
      },
      data: {
        messages: message,
        model: process.env.OCELL_MODEL,
        chat_mode: process.env.OCELL_CHAT_MODE,
        chat_param: process.env.OCELL_CHAT_PARAM
      }
    });
    
    return response.data;
  } catch (error) {
    logger.error(`Error get Ocell Docs ${message}:`, error);
    return null;
  }
} 