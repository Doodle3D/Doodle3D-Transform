/* eslint no-console: 0 */

const checker = require('license-checker');
const _ = require('lodash');
require('core-js/fn/object/entries');

const [projectPath = __dirname] = process.argv.slice(2);
if (!projectPath) {
  console.log('No project path specified');
  process.exit(1);
}

const corrections = {
  'eventdispatcher.js': 'MIT',
  'pouchdb-collections': 'Apache 2',
  bufferjs: 'MIT'
};

checker.init({
  start: projectPath,
  production: true,
  development: false,
  customFormat: {
    name: ''
  }
}, (err, json) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    // the checker returns an object instead of an array, so use Object.entries to iterate
    let dependencies = Object.entries(json).map(dep => {
      const { name, publisher, licenses } = dep[1];
      const result = {
        name,
        publisher,
        licenses: corrections[name] || licenses,
        url: `https://www.npmjs.com/package/${name}`
      };
      return result;
    });
    dependencies = _.uniqBy(dependencies, dep => dep.name);

    console.log(JSON.stringify(dependencies));
  }
});
