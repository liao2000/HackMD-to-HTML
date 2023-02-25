#!/usr/bin/env node
import commander from 'commander'
import path from 'path'
import { Convert } from './converter'

commander.program.version('0.0.8', '-v, --version', 'output the current version')
commander.program
  .requiredOption('-s, --source <files_or_dirs...>', 'specify the input markdown files or directories')
  .addOption(new commander.Option('-d, --destination <path>', 'specify the output directory').default('./output', './output'))
  .addOption(new commander.Option('-l, --layout <html_file>', 'specify the layout file').default('', '""'))
  .addOption(new commander.Option('-b, --hardBreak', 'use hard break instead of soft break'))
  .parse(process.argv)

const options = commander.program.opts()

const dest: string = options.destination === '' ? './output' : options.destination
const layout: string = options.layout === '' ? path.join(__dirname, '../layout.html') : options.layout
const hardBreak: boolean = options.hardBreak
new Convert(options.source, dest, layout, hardBreak).convertBatch()
