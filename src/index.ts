#! /usr/bin/env node

import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { createEnvFile } from './createEnvFile'
import { getEnvs } from './getEnvs'

const argv = yargs(hideBin(process.argv))
  .options({
    f: {
      type: 'string',
      default: '.env',
      describe: 'name of the file where the variables will be placed',
      alias: 'fileName'
    }
  })
  .scriptName('extract-env')
  .usage('Usage: $0')
  .help()
  .parseSync()

const fileName: string = argv.fileName as string

const directory = process.cwd()
const envs = getEnvs(directory)

createEnvFile(envs, fileName)
