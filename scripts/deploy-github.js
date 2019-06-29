const ghpages = require('gh-pages')

// replace with your repo url
ghpages.publish(
  'public',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/eLeontev/mindmap.github.io.git',
  },
  () => {
    console.log('Deploy Complete!')
  }
)
