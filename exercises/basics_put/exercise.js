var generate = require('../../lib/generate')

module.exports = require('../../lib/exercise')({
  dir: __dirname,
  init: function () {
    var data = generate(5 + (Math.random() * 20 | 0))
    return {
      prepare: function (db, callback) {
        callback()
      },
      exec: function (dir, mod, callback) {
        if (typeof mod !== 'function') {
          throw String('{error.mod.not_function}')
        }
        if (mod.length < 3) {
          throw String('{error.mod.not_long_enough}')
        }
        mod(dir, data, function () {
          require('../../lib/read-db')(dir, 'utf8', callback)
        })
      }
    }
  }
})
