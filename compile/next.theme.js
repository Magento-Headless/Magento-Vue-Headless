const consola = require('consola')
const fs = require('fs-extra')
const { program } = require('commander')

program
  .version('0.0.1')
  .option('-N, --n', 'Namespace')
  .option('-T, --t', 'Theme name')
  .parse(process.argv)

const options = program.opts()

const createPwaTheme = () => {
  const opts = Object.values(options)
  const valid = opts.every((flag) => flag)

  if (!valid || opts.length < 2 || program.args.length < 2) {
    consola.error(
      `There is need valid argv, please run: yarn create:theme --help`
    )
    return
  }

  const namespace = program.args[0]
  const themename = program.args[1]
  const buildpath = './build'
  const filepath = './theme'
  const outpath = `./deploy/${namespace}/${themename}`

  const formatThemeFile = (filename) => {
    fs.readFile(`${outpath}/${filename}`, 'utf-8', (e, data) => {
      if (e) consola.error(e)

      const format = data.replace('<%= namespace %>', namespace)
      const result = format.replace('<%= themename %>', themename)

      fs.writeFile(`${outpath}/${filename}`, result, 'utf8')
    })
  }

  // Clear folder cache
  fs.removeSync(outpath)

  // Create magento pwa theme
  consola.info(
    '================== Create magento pwa theme - Start  =================='
  )
  fs.copy(filepath, outpath, (err) => {
    if (err) {
      return consola.error(err)
    }

    consola.info(
      '================== Format namespace and themename - Start  =================='
    )
    // Format theme.xml for magento theme
    formatThemeFile('theme.xml')
    // Format registration.php for magento theme
    formatThemeFile('registration.php')
    consola.success(
      '================== Format namespace and themename - End  =================='
    )

    // Copy build files to deploy/web folder
    fs.pathExists(buildpath).then((exists) => {
      if (exists) {
        consola.info(
          '================== Copy build files to deploy/web folder - Start  =================='
        )
        fs.ensureDir(`${outpath}/web`)
          .then(() => {
            fs.copy(buildpath, `${outpath}/web`, (e) => {
              if (e) consola.error(e)
              consola.success(
                '================== Copy build files to deploy/web folder - End  =================='
              )
            })

            // Copy index.html to magento theme root.phtml
            consola.info(
              '================== Copy index.html to magento theme root.phtml - Start  =================='
            )
            fs.copy(
              `${buildpath}/index.html`,
              `${outpath}/Magento_Theme/templates/root.phtml`,
              (e) => {
                if (e) consola.error(e)

                consola.success(
                  '================== Copy index.html to magento theme root.phtml - End  =================='
                )
              }
            )

            consola.success(
              '================== Create magento pwa theme - End  =================='
            )
          })
          .catch(() => {})
      } else {
        consola.error('Please run command yarn build ...')
      }
    })
  })
}

createPwaTheme()
