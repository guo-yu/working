import exeq from 'exeq'

const WORKFLOWS = {
  'less': 'node_modules/.bin/lessc --clean-css less/app.less > dist/app.min.css',
  'serve': 'node_modules/.bin/ionic serve .',
  'watch-riot': 'node_modules/.bin/riot --watch --compact --type es6 components/ dist/components.js',
  'watch-bebel': 'node_modules/.bin/babel libs --out-dir dist --source-maps --watch',
  'watch-less': `node_modules/.bin/rewatch less/*.less -c '${ WORKFLOWS.less }'`,
}

export WORKFLOWS

export default function(pkg) {
  const workflows = Object.keys(pkg.scripts).map(k => pkg.scripts[k])
  exeq.apply(exeq, workflows)
    .then(results => {
      console.log(`${ result.length } workflows running now`)
    })
    .catch(err => 
      console.log(err))
}