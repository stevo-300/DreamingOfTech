
let list = {
  items: []
}

$(document).on('click', 'li', function () {
  $(this).toggleClass('completed')
})

$(document).on('click', 'span.remove', function (e) {
  e.stopPropagation()
  $(this).parent().fadeOut(500, function () {
    $(this).remove()
  })
  for (let i = 0; i < list.items.length; i++) {
    if (list[i].items.id === $(this).id) {
      list.items.splice(i, 1)
    }
  }
  updateList()
})

$(document).on('click', '.shoppingQty', function (e) {
  console.log($(this).parent())
  $(this).parent()[0].classList.remove('completed')
  console.log($(this).parent())
})

$('.fa-plus').click(function () {
  $('input[type=text]').fadeToggle()
})

// KeyPress Events
$('input[type=text]#addTodo').keypress(function (e) {
  if (e.which === 13) {
    $('#todolist').append(`<li class="listItem shopping"><span class="remove shopping"><i class="fa fa-trash"></i></span><input type="text" class="shoppingQty" /> ${$(this).val()}</li>`)
    let item = {
      id: 'sdfs',
      item: $(this).val(),
      qty: 'QTY',
      status: 'complete/active'
    }
    list.items.push(item)
    updateList()
    $(this).val('')
  }
})

function updateList () {
  // take the list and update in the background for every change
  console.log('Server Updated')
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
loadCSS('/css/tools/shopping.css')
