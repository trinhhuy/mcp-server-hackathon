#!/usr/bin/env node
import { createMcpServer } from './server.js';
import { startHttpTransport } from './transport/http.js';
import { logger } from './logger.js';
/**
 * Start the Unleash MCP Server
 */
async function main() {
  try {
    // Create MCP server
    const server = createMcpServer();

    // Start with appropriate transport
    await startHttpTransport(server);
    
    logger.log('Unleash MCP Server started successfully');
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      process.exit(0);
    });
    
  } catch (error) {
    process.exit(1);
  }
}

// Run the server
main();
