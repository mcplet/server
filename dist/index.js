import { Server } from "@modelcontextprotocol/sdk/server/index.js"; 
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import fetch from 'node-fetch';


// Parse command line arguments
const args = process.argv.slice(2);
const uid = args[0];

if (!uid) {
  process.exit(1);
}

const REMOTE_BASE_URL = 'https://www.mcplet.com/api/protocol';

async function fetchRemoteData(endpoint) {
  try {
    const fetchurl = `${REMOTE_BASE_URL}/${uid}/${endpoint}`;
    const response = await fetch(fetchurl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json  = await response.json();
    return json;
  } catch (error) {
    return [];
  }
}

async function postRemoteData(endpoint, postBody) {
  try {
	const fetchurl = `${REMOTE_BASE_URL}/${uid}/${endpoint}`;
	const response = await fetch(fetchurl, {
		method: "post",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},

	  //make sure to serialize your JSON body
		body: JSON.stringify(postBody)
	});
  
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const json  = await response.json();
    return json;
  } catch (error) {
    return [];
  }
}


const server = new Server(
  {
    name: "mcplet-mcp-server",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  const tools = await fetchRemoteData('');
  return (tools);
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolname = request.params.name;
  const invokeRes = await postRemoteData('',request.params);
  return invokeRes;
});

async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {

  }
}

main();
