const host =
  process.env.REACT_APP_API_BASE_URL || 'https://test-api.betterfield-resources-dapp.coimbra.io'

const config = {
  apiBaseUrl: `${host}/api/v1`,
}

export default config