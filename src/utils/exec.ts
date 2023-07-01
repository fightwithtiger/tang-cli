import { exec, execSync } from 'child_process'
import chalk from 'chalk'
import ora from 'ora'

export function execCommandSync(command: string) {
  try {
    return execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(chalk.red(`exec error: ${error}`))
    throw error
  }
}

export function execCommand(command: string) {
  const spinner = ora('Loading unicorns').start()
  spinner.color = 'yellow'
  spinner.text = 'Loading...'
  return new Promise<string>((resolve, reject) => {
    exec(command, (error) => {
      spinner.stop()
      if (error) {
        console.error(chalk.red(`exec error: ${error}`))
        reject(error)
      } else {
        resolve('')
      }
    })
  })
}
