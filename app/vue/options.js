const path = require('path')

module.exports = {
  rootPath: path.join(__dirname, "../routes"),
  template: {
    html: {
      start: '<!DOCTYPE html><html>',
      end: '</html>'
    },
    body: {
      start: '<body>',
      end: '</body>'
    },
    template: {
      start: '<div id="app">',
      end: '</div>'
    }
  },
  head: {
    title: 'It will be a pleasure',
    // Meta tags
    metas: [{
        name: 'application-name',
        content: 'Name of my application'
      },
      {
        name: 'description',
        content: 'A description of the page',
        id: 'desc'
      }, // id to replace intead of create element
      // ...

      {
        rel: 'icon',
        type: 'image/png',
        href: '/assets/favicons/favicon-32x32.png',
        sizes: '32x32'
      }
      // Generic rel for things like icons and stuff
    ],
    // Scripts
    scripts: [{
        src: '/assets/scripts/hammer.min.js'
      },
      {
        src: '/assets/scripts/vue-touch.min.js',
        charset: 'utf-8'
      },
      // Note with Scripts [charset] is optional defaults to utf-8
      // ...
    ],
    // Styles
    styles: [{
        style: '/assets/rendered/style.css'
      }, {
        style: '/assets/rendered/style.css',
        type: 'text/css'
      },
      {
        style: 'https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.3.4/theme-chalk/index.css',
        type: 'text/css'
      }
      // Note with Styles, [type] is optional...
      // ...
    ],
  }
}