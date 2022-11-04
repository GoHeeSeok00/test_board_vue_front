// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'hello-apollo',
      // URL to the GraphQL API
      url: 'http://localhost:3000/graphql',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}