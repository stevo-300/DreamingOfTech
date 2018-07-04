let root = []

function setup () { // eslint-disable-line
  root.push(new TreeNode(root.length))
}

class TreeNode {
  constructor (id, parent) {
    this.parent = parent || 'tree'
    this.id = id
    this.createElem()
  }

  clicked () {
    console.log('i have been clicked')
  }

  dblClicked () {
    console.log('i have been doubleClicked')
  }

  createElem () {
    let parent = document.getElementById(this.parent)
    console.log(parent)
    let elem = createDiv('')  // eslint-disable-line
    elem.id(this.id)
    // elem.doubleClicked(this.dblClicked)
    elem.mousePressed(this.clicked)
    elem.parent(parent)
  }
}

function loadCSS (filename) {
  var file = document.createElement('link')
  file.setAttribute('rel', 'stylesheet')
  file.setAttribute('type', 'text/css')
  file.setAttribute('href', filename)
  document.head.appendChild(file)
}

// just call a function to load your CSS
// this path should be relative your HTML location
loadCSS('/css/tools/decisiontree.css')
