import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: ['./package.json'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
