const fs = require('fs')
const path = require('path')
const colors = require('colors')

const error = (msg) => {
  process.stderr.write(new Buffer(colors.red(msg) + '\n'))
}

const success = (msg) => {
  process.stdout.write(new Buffer(colors.green(msg) + '\n'))
}

const output = (msg) => {
  process.stdout.write(new Buffer(msg))
}

if (process.argv.length < 3) {
  error('Please provide the name of a project to CD into.')
  process.exit(100)
} else {
  const target = process.argv[2]
  const work = path.join(process.env.HOME, 'work')
  const carimus_dir = path.join(work, 'carimus')
  let possible =
    [
      `nursefly/nursefly-${target}`,
      `nursefly/${target}`,
      `everest/${target}`,
      `carimus/${target}`,
      `goodbookey/${target}`,
      `.old/everest/${target}`,
      `.old/carimus/${target}`,
      `.old/goodbookey/${target}`,
      `${target}`
    ]

  possible = possible.concat(
    fs.readdirSync(carimus_dir)
      .filter((file) => fs.statSync(path.join(carimus_dir, file)).isDirectory())
      .map((projdir) => `carimus/${projdir}/${target}`)
  )

  for (let dir of possible) {
    dir = path.join(work, dir)
    if(fs.existsSync(dir)) {
      output(dir)
      if (dir.indexOf('.old') !== -1) { error('Directory is in .old!') }
      process.exit(0)
    }
  }

  error(`No project directory could be found for "${target}"`)
  process.exit(1)
}
