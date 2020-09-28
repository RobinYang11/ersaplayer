import ts from 'rollup-plugin-typescript2'
import path from 'path'

const version = require('../package.json').version

const banner =
  '/*!\n' +
  ` * ersa-player v${version}\n` +
  ` * (c) 2020-${new Date().getFullYear()} robin Yang\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const buildTemplate = {
  "iife": {
    file: 'iife/ersaplayer.development.js',
    format: 'iife',
    env: 'production',
    name: 'Player',
    banner
  },
  "cjs": {
    file: 'cjs/ersaplayer.development.js',
    format: 'cjs',
    env: 'production',
    name: 'Player',
    banner
  },
  "umd": {
    file: 'umd/ersaplayer.development.js',
    format: 'umd',
    env: 'production',
    name: 'Player',
    banner
  },
}

function getConfig(target) {
  console.log(process.env.target)
  const opts = buildTemplate[target]
  console.log(opts)
  return {
    input: path.resolve("ersaplayer", "../src/index.ts"),
    output: {
      file: opts.file,
      format: opts.format,
      banner: opts.banner,
      name: opts.name
    },
    plugins: [
      ts({ 'tsconfig': path.resolve('../ersaplayer', 'tsconfig.json') })
    ]
  }
}


export default getConfig(process.env.target);