import { Tool } from 'langchain/agents';
import Ajv from 'ajv';

import ytdl from 'ytdl-core';
import fs from 'fs';

async function call({ url, filename }) {

  const video = ytdl(url);
  const fileStream = fs.createWriteStream(filename);
  let downloadedBytes = 0;
  let totalBytes = 0;

  video.on('progress', (chunkLength, downloaded, total) => {
    downloadedBytes = downloaded;
    totalBytes = total;
    const percentage = (downloaded / total * 100).toFixed(2);
    console.log(`Downloading: ${percentage}% (${downloaded}/${total} bytes)`);
  });

  video.pipe(fileStream);
  await new Promise((resolve, reject) => {
    fileStream.on('finish', resolve);
    fileStream.on('error', reject);
  });
  console.log(`Download completed. File saved as ${filename}.`);
  return { fileAddress: filename };
}

class DownloadYoutubeVideoToFile extends Tool {
  name = 'download-youtube-video-to-file';
  
  description = `Download a youtube video from a URL to a given file on your filesystem (relative to the current path), and returns the file's address where it was saved. The action input should adhere to this JSON schema:
{{"type":"object","properties":{{"url":{{"type":"string"}},"filename":{{"type":"string"}}}},"required":["url","filename"]}}`;
  
  ajv = new Ajv();

  inputSchema = {"type":"object","properties":{"url":{"type":"string"},"filename":{"type":"string"}},"required":["url","filename"]};
  
  outputSchema = {"type":"object","properties":{"fileAddress":{"type":"string"}},"required":["fileAddress"]};

  validate(data, schema) {
    if (schema) {
      const validateSchema = this.ajv.compile(schema);
      if (!validateSchema(data)) {
        throw new Error(this.ajv.errorsText(validateSchema.errors));
      }
    }
  }

  async _call(arg) {
    const input = JSON.parse(arg);
    this.validate(input, this.inputSchema);
    const output = await call(input);
    this.validate(output, this.outputSchema);
    return JSON.stringify(output);
  }
}

export default DownloadYoutubeVideoToFile;