/**
 * Unleash MCP Server implementation
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getOcellDocTool } from './tools/get-ocell-docs.js';
import { logger } from "./logger.js";

/**
 * Create and configure an Unleash MCP server
 * 
 * @returns The configured MCP server instance
 */
export function createMcpServer(): McpServer {
  logger.log('Creating Unleash MCP Server...');
  
  // Create new MCP server
  const server = new McpServer({
    name: "Unleash MCP",
    version: "1.0.2"
  });

  // Register tools
  server.tool(
      getOcellDocTool.name,
      getOcellDocTool.description,
      getOcellDocTool.paramsSchema as any,
      getOcellDocTool.handler as any
  );

  return server;
}
