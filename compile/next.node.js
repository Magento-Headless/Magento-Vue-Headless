const consola = require('consola')
const fs = require('fs')
const path = require('path')
const pkg = require('../package.json')

const args = process.argv.slice(2)[0]
const message = `/*
 * @Copyright: ${pkg.copyright}
 */
`
const autoHeader = (filePath) => {
  const dir = path.resolve(__dirname, filePath)

  if (fs.existsSync(dir)) {
    fs.readdir(
      dir,
      {
        encoding: 'utf-8',
        withFileTypes: true
      },
      (error, files) => {
        if (error) consola.error(new Error(error))

        files.forEach((file) => {
          const realPath = `${dir}/${file.name}`

          if (file.isDirectory()) {
            autoHeader(realPath)
          } else {
            const regex = /\.(js|jsx)$/

            if (regex.test(file.name)) {
              fs.readFile(realPath, 'utf-8', (err, data) => {
                if (err) consola.error(new Error(err))

                if (data.indexOf(message) > -1) {
                  consola.info({
                    message: `${file.name} already has header notes.`,
                    badge: true
                  })
                } else {
                  fs.writeFile(realPath, `${message}${data}`, 'utf8', (e) => {
                    if (e) consola.error(new Error(e))
                    consola.success({
                      message: `${file.name} auto header success.`,
                      badge: true
                    })
                  })
                }
              })
            }
          }
        })
      }
    )
  } else {
    consola.error(`This file path not exists...`)
  }
}

autoHeader(args)
