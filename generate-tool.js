/* 
This script generates a tool using the Toolkit AI library
https://github.com/hey-pal/toolkit-ai

You can call it by just calling `node generate-tool.js` from the command line.
*/

import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import Toolkit from '@heypal/toolkit-ai';

// OpenAI API key can optionally be set here, or the underlying model
// will use the environment variable OPENAI_API_KEY
const toolkit = new Toolkit({
  // openAIApiKey: '',
});

(async () => {
  const tool = await toolkit.generateTool({
    name: 'Temperature Converter',
    description:
      'Converts a temperature from Farenheit, Celsius, or Kelvin to any other unit.',
  });

  console.log(tool.langChainCode);
})();