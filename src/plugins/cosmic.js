import Cosmic from 'cosmicjs'
const api = Cosmic()

const bucket = api.bucket({
  slug: process.env.VUE_APP_SLUG,
  read_key: process.env.VUE_APP_READ_KEY,
  write_key: process.env.VUE_APP_WRITE_KEY
}
)
export default bucket