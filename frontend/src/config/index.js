const host =
  process.env.REACT_APP_API_BASE_URL || 'https://test-api.betterfield-resources-dapp.coimbra.io'
const env = process.env.ENV || 'test'

const config = {
  apiBaseUrl: `${host}/api/v1`,
  env
}

export default config