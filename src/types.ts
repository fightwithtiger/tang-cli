export interface GlobalConfig {
  version: string
  repoPath: Record<string, string>
}

export interface CreateCommandOptions {
  force?: boolean
}

export type CreateTemplateType = 'web' | 'library' | 'vite-template' | 'starterts' | 'starterjs' | 'mono'

export interface CreateTemplateProps {
  projectName: string
  targetDir: string
  projectType: CreateTemplateType
}
