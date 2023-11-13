#! /usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_yargs = __toESM(require("yargs/yargs"));
var import_helpers = require("yargs/helpers");

// src/createEnvFile.ts
var import_fs = __toESM(require("fs"));
var createEnvFile = (envVariables, outputPath = ".env") => {
  let existingEnvVariables = {};
  if (import_fs.default.existsSync(outputPath)) {
    const existingEnvContent = import_fs.default.readFileSync(outputPath, "utf-8");
    existingEnvVariables = existingEnvContent.split("\n").filter((line) => line.trim() !== "").reduce((acc, line) => {
      const [name, value = ""] = line.split("=");
      acc[name] = value;
      return acc;
    }, {});
  }
  const newEnvVariables = envVariables.filter((env) => existingEnvVariables[env] === void 0);
  const envContent = Object.assign({}, existingEnvVariables, ...newEnvVariables.map((env) => ({ [env]: "" })));
  const envContentString = Object.entries(envContent).map(([name, value]) => `${name}=${value}`).join("\n");
  import_fs.default.writeFileSync(outputPath, envContentString, "utf-8");
};

// src/getEnvs.ts
var import_fs2 = __toESM(require("fs"));
var import_glob = require("glob");
var import_path = __toESM(require("path"));
var scansFiles = (directory2) => {
  const result = [];
  const files = (0, import_glob.globSync)("**/*.{ts,js}", { ignore: ["node_modules/**", "dist/**"] });
  files.forEach((file) => {
    const filePath = import_path.default.join(directory2, file);
    const content = import_fs2.default.readFileSync(filePath, "utf-8");
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
    const content = import_fs2.default.readFileSync(file, "utf-8");
    const regex = /process\.env\.([A-Za-z_]+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      envVariables.push(match[1]);
    }
  });
  return envVariables;
};

// src/index.ts
var argv = (0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).options({
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
