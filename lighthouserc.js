module.exports = {
  ci: {
    collect: {
      url: ['http://localhost/'],
      staticDistDir: 'build',
    },

    assert: {
      assertions: {
        'categories:accessibility': [
          'warn',
          {
            minScore: 0.85,
          },
        ],
        'categories:best-practices': [
          'warn',
          {
            minScore: 0.85,
          },
        ],
        'categories:performance': [
          'warn',
          {
            minScore: 0.85,
          },
        ],
        'categories:seo': [
          'warn',
          {
            minScore: 1.0,
          },
        ],
        'dom-size': [
          'warn',
          {
            maxNumericValue: 30000,
          },
        ],
        'first-contentful-paint': [
          'warn',
          {
            maxNumericValue: 4000,
          },
        ],
        interactive: [
          'warn',
          {
            maxNumericValue: 5000,
          },
        ],
        'is-crawlable': false,
        'errors-in-console': [
          'error',
          {
            maxLength: 4,
          },
        ],
        'unused-css-rules': 'off',
        'uses-text-compression': 'off',
        'unused-javascript': 'off',
      },
    },

    upload: {
      uploadUrlMap: true,
      target: 'temporary-public-storage',
    },
  },
};
