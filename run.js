const fs = require('fs');
const path = require('path');
const { spawn } = require("child_process");

const args = process.argv.slice(2);
const runner = args[0];
const index = args[1];

if (!index) {
    throw new Error('No index specified');
}

function resolvePath(runner) {
    switch (runner) {
        case 'leetcode': 
            return path.join(__dirname, 'leetcode');
        default:
            throw new Error(`Unknown runner: ${runner}`);
    }
}

const issuesPath = resolvePath(runner);
const files = Array.from(fs.readdirSync(issuesPath));

const targetFileName = files.find(f => f.startsWith(`${index}.`));
if (!targetFileName) {
    throw new Error(`No target file found for index: ${index}`);
}

const targetFilePath = path.join(issuesPath, targetFileName);

console.log('RUN: ' + targetFileName);
const nodeProcess = spawn('node', [targetFilePath]);

nodeProcess.stdout.on("data", data => {
    console.log(`${data}`);
});

nodeProcess.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
});

nodeProcess.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

nodeProcess.on("close", code => {
    console.log(`child process exited with code ${code}`);
});