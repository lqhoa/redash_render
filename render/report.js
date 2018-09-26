#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const childProcess = require('child_process');
const slimerjs = require('slimerjs');
const fs = require('fs');
const { WebClient } = require('@slack/client');

const binPath = slimerjs.path;
const output = '.png'

program
  .version('0.1.0', '-v, --version')
  .option('-p, --path [path]', 'Path')
  .parse(process.argv)
if (typeof program.path !== 'string') {
   console.error('No path given! Please type help for more detail');
   process.exit(1);
}
const pathfile = program.path;
const content = fs.readFileSync(pathfile);
const dataJson = JSON.parse(content);
const token = dataJson.slack_token;   
const conversationId = dataJson.slack_channel_id; 
const web = new WebClient(token);

for (let key in dataJson.list_queries_uri) {
    let childArgs = [
        path.join(__dirname, dataJson.file_render),
        dataJson.redash_key,
        dataJson.redash_domain_name + dataJson.list_queries_uri[key],
        key + output
    ]
    childProcess.execFileSync(binPath, childArgs,{stdio:[0,1,2]})

    // Send simple text to the webhook channel  
    web.files.upload({
        channels: conversationId,
        file: fs.createReadStream(key + output),
    })
        .then((res) => {
        // `res` contains information about the uploaded file
        console.log('File uploaded: ', res.file.id);
        })
        .catch(console.error);
}
