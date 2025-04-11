# MCPlet Server

MCPlet is a server implementation for the Model Context Protocol (MCP), designed to make it easy to create and use MCP tools and resources.

## Overview

MCPlet Server acts as a bridge between AI assistants and external tools or resources. It implements the Model Context Protocol (MCP) standard, allowing AI assistants to access additional capabilities through a standardized interface.

## Features

- **MCP Standard Compliance**: Fully implements the Model Context Protocol specification
- **Remote Tool Integration**: Connects to the MCPlet API to fetch and execute tools
- **Stdio Transport**: Uses standard input/output for communication with AI assistants
- **Simple Setup**: Easy to install and configure

## Installation

```bash
# Clone the repository
git clone https://github.com/mcplet/server.git

# Navigate to the server directory
cd server

# Install dependencies
npm install
```

## Requirements

- Node.js (v14 or higher recommended)
- npm (v6 or higher)

## Usage

To use MCPlet Server, you need to provide a unique identifier (UID) when starting the server:

```bash
node index.js YOUR_UID
```

Replace `YOUR_UID` with your MCPlet unique identifier. You can obtain a UID by registering at [mcplet.com](https://www.mcplet.com).

## How It Works

1. The server initializes with your unique identifier
2. It connects to the MCPlet API to fetch available tools
3. When an AI assistant requests a tool, the server forwards the request to the MCPlet API
4. Results are returned to the AI assistant through the standard MCP protocol

## Example

```javascript
// Import the MCPlet server
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Create a new server instance
const server = new Server(
  {
    name: "my-custom-mcp-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Connect using stdio transport
const transport = new StdioServerTransport();
await server.connect(transport);
```

## API Reference

MCPlet Server uses the following endpoints:

- `https://www.mcplet.com/api/protocol/{uid}/` - Fetches available tools
- `https://www.mcplet.com/api/protocol/{uid}/invoke?method={toolname}` - Executes a tool

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Contact

- Email: info@mcplet.com
- GitHub: [https://github.com/mcplet/server](https://github.com/mcplet/server)
- Website: [https://www.mcplet.com](https://www.mcplet.com)