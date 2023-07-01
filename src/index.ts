import { Command } from 'commander'
import { createCommand } from './command'
import { getConfig } from './config'

export function run() {
  try {
    const config = getConfig()
    const program = new Command()

    program
      .name('tang-cli')
      .description('CLI to lay flat and touch fish')
      .version(config.version)

    program.command('create')
      .description('quick create a new project')
      .argument('<string>', 'project name')
      .option('-f, --force', 'overwrite target directory if it exists')
      .action(createCommand)

    program.parse()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
