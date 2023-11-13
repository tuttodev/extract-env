import fs from 'fs'

export const createEnvFile = (envVariables: string[], outputPath = '.env'): void => {
  const envContent = envVariables
    .map((env) => `${env}=`)
    .join('\n')

  fs.writeFileSync(outputPath, envContent, 'utf-8')
}
