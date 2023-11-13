#! /usr/bin/env node

// src/index.ts
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

// src/createEnvFile.ts
import fs from "fs";
var createEnvFile = (envVariables, outputPath = ".env") => {
  let existingEnvVariables = {};
  if (fs.existsSync(outputPath)) {
    const existingEnvContent = fs.readFileSync(outputPath, "utf-8");
    existingEnvVariables = existingEnvContent.split("\n").filter((line) => line.trim() !== "").reduce((acc, line) => {
      const [name, value = ""] = line.split("=");
      acc[name] = value;
      return acc;
    }, {});
  }
  const newEnvVariables = envVariables.filter((env) => existingEnvVariables[env] === void 0);
  const envContent = Object.assign({}, existingEnvVariables, ...newEnvVariables.map((env) => ({ [env]: "" })));
  const envContentString = Object.entries(envContent).map(([name, value]) => `${name}=${value}`).join("\n");
  fs.writeFileSync(outputPath, envContentString, "utf-8");
};

// src/getEnvs.ts
import fs2 from "fs";
import { globSync } from "glob";
import path from "path";
var scansFiles = (directory2) => {
  const result = [];
  const files = globSync("**/*.{ts,js}", { ignore: ["node_modules/**", "dist/**"] });
  files.forEach((file) => {
    const filePath = path.join(directory2, file);
    const content = fs2.readFileSync(filePath, "utf-8");
    if (content.includes("process.env")) {
      result.push(filePath);
    }
  });
  return result;
};
var getEnvs = (directory2) => {
  const filesWithEnvs = scansFiles(directory2);
  const envVariables = [];
  filesWithEnvs.forEach((file) => {
    const content = fs2.readFileSync(file, "utf-8");
    const regex = /process\.env\.([A-Za-z_]+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      envVariables.push(match[1]);
    }
  });
  return envVariables;
};

// src/index.ts
var argv = yargs(hideBin(process.argv)).options({
  f: {
    type: "string",
    default: ".env",
    describe: "name of the file where the variables will be placed",
    alias: "fileName"
  }
}).scriptName("extract-env").usage("Usage: $0").help().parseSync();
var fileName = argv.fileName;
var directory = process.cwd();
var envs = getEnvs(directory);
createEnvFile(envs, fileName);
