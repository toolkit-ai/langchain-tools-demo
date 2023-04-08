# langchain-tools-demo
A simple LangChain agent setup that makes it easy to test out new agent tools.

You can paste tools you generate from Toolkit into the `/tools` folder and import them into the agent in the index.js file.

Start the agent by calling:

`pnpm dev`

# Tool Generation
You can also try to generate a new LangChain tool using the work we've been doing with Toolkit (toolkit.club)

(https://github.com/hey-pal/toolkit-ai)[https://github.com/hey-pal/toolkit-ai]

Just open up the `generate-tool.js` file, and swap out the info for the tool you want to generate.

Then call `pnpm generate-tool` 

In a little bit of time you'll have a working LangChain tool you can then import and try using.

