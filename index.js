import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { OpenAI } from 'langchain';
import { initializeAgentExecutor } from 'langchain/agents';
import {
  SerpAPI,
  Calculator,
  RequestsGetTool,
  RequestsPostTool,
} from 'langchain/tools';

import readline from 'readline';

/* 
  An example of a Toolkit generated file we copied over
*/
import DownloadYoutubeVideoToFile from './tools/DownloadYoutubeVideo.js';

const model = new OpenAI({ temperature: 0, model: 'gpt-4' });
const tools = [
  new SerpAPI(),
  new Calculator(),
  new RequestsPostTool(),
  new RequestsGetTool(),
  new DownloadYoutubeVideoToFile(),
];

const executor = await initializeAgentExecutor(
  tools,
  model,
  'zero-shot-react-description',
  true
);
console.log('Loaded agent.');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('What do you want to do? ', async (input) => {
  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });

  console.log(`Got output ${result.output}`);

  rl.close();
});
