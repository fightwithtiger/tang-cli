import type { GlobalConfig } from './types'
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
      'vite-template': 'https://github.com/fightwithtiger/vite-template.git',
      'starterts': 'https://github.com/fightwithtiger/starterts.git',
      'starterjs': 'https://github.com/fightwithtiger/starterjs.git',
      'mono': 'https://github.com/fightwithtiger/mono.git',
    },
  }

  return config
}
