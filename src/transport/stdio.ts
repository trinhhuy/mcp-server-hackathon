/**
 * Stdio transport for Unleash MCP Server
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { logger } from '../logger.js';

/**
 * Create and connect a stdio transport to the MCP server
 * 
 * @param server The MCP server instance
 * @returns Promise that resolves when connected
 */
export async function startStdioTransport(server: McpServer): Promise<void> {
  logger.log('Starting MCP Server with stdio transport');
  
  // Create stdio transport
  const transport = new StdioServerTransport();
  
  // Connect to the server
  await server.connect(transport);
  
  logger.log('Stdio transport connected');
  
  // Handle process termination
  process.on('SIGINT', () => {
    process.exit(0);
  });
}
