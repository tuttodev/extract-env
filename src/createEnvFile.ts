import fs from 'fs'

export const createEnvFile = (envVariables: string[], outputPath = '.env'): void => {
  let existingEnvVariables: Record<string, string> = {}

  if (fs.existsSync(outputPath)) {
    const existingEnvContent = fs.readFileSync(outputPath, 'utf-8')
    existingEnvVariables = existingEnvContent
      .split('\n')
      .filter((line) => line.trim() !== '')
      .reduce((acc: Record<string, string>, line) => {
        const [name, value = ''] = line.split('=')
        acc[name] = value
        return acc
      }, {})
  }

  const newEnvVariables = envVariables.filter((env) => existingEnvVariables[env] === undefined)

  const envContent = Object.assign({}, existingEnvVariables, ...newEnvVariables.map((env) => ({ [env]: '' })))

  const envContentString = Object.entries(envContent)
    .map(([name, value]) => `${name}=${value as string}`)
    .join('\n')

  fs.writeFileSync(outputPath, envContentString, 'utf-8')
}
