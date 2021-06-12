const Cosmic = require('cosmicjs')()

const bucket = Cosmic.bucket({
  slug: process.env.VUE_APP_SLUG,
  read_key: process.env.VUE_APP_READ_KEY,
  write_key: process.env.VUE_APP_WRITE_KEY
})

module.exports = bucket