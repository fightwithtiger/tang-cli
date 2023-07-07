import { CreateSecondaryTemplateEnum, type GlobalConfig } from './types'
import { getPackageJSON } from './utils'

let config: GlobalConfig | undefined

export function getConfig() {
  if (config) {
    return { ...config }
  }
  const pkg = getPackageJSON()

  config = {
    version: pkg.version,
    repoPath: {
      [CreateSecondaryTemplateEnum.VITE_TEMPLATE]: 'https://github.com/fightwithtiger/vite-template.git',
      [CreateSecondaryTemplateEnum.STARTER_tS]: 'https://github.com/fightwithtiger/starterts.git',
      [CreateSecondaryTemplateEnum.STARTER_JS]: 'https://github.com/fightwithtiger/starterjs.git',
      [CreateSecondaryTemplateEnum.MONO]: 'https://github.com/fightwithtiger/mono.git',
      [CreateSecondaryTemplateEnum.STARTER_VSCODE]: 'https://github.com/fightwithtiger/starter-vscode.git',
    },
  }

  return config
}
