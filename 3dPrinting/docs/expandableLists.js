function setup(){
  removeDuplicates()
  addListPoints()
  makeLinks()
  prepareList()
}

function addListPoints() {
  $('section').prepend('<img class="listPoint" src="collapsed.png"/>')
}

function makeLinks() {
  var toLinkTo = findObjectNames()
  $('dt').each(function() {
    for(var i = 0; i < toLinkTo.length; i++) {
      replaceNameInTextWithLink(this, toLinkTo[i])
    }
  })
}

function replaceNameInTextWithLink(element, text) {
  $(element).html(function() {
    return $(element).html().replace(text, '<a href="#' + text +'">' + text + "</a>")
  })
}

function findObjectNames() {
  var objectNames = []
  $('section').filter(function() {
    var text = $(this).children('h1').text()
    return text.split(" ").length == 1 && text[0] == text[0].toUpperCase()
  }).each(function() {
    var text = $(this).children('h1').text()
    objectNames.push(text)
    $(this).children('h1').attr('id', text)
  })
  return objectNames
}

function removeDuplicates() {
  $('#main').children().filter(function() {
    var text = $(this).children('h1').text()
     if (isDuplicate(text))
       $(this).remove()
     else
       uniqueElements.push(text)
  })
}
  var uniqueElements = []
  function isDuplicate(text) {
    for (var i = 0; i < uniqueElements.length; i++) {
      if (uniqueElements[i] == text) return true
    }
    return false
  }

// Based on http://jasalguero.com/ledld/development/web/expandable-list/
function prepareList() {
  $('body').find('dl:has(dl)').unbind('click')
  $('section').filter(function() 
    {
      return $(this).parent().get('id') != "main"
    })
    .click(function(event) 
    {
      $(this).toggleClass('expanded');
      $(this).children('dl').toggle('medium');
      $(this).children('.listPoint').each(function() {
        if ($(this).attr('src') == "expanded.png")
          $(this).attr('src', "collapsed.png")
        else 
          $(this).attr('src', "expanded.png")
      }) 
      return false;
    })
    .addClass('collapsed')
    .removeClass('expanded')
    .children('dl').hide();
 
  //Hack to add links inside the cv
  $('body a').unbind('click').click(function() {
    window.open($(this).attr('href'), "_self");
    return false;
  });
  //Create the button functionality
  $('#expandList').unbind('click').click(function() {
    $('.collapsed').addClass('expanded');
    $('.collapsed').children('dl').show('medium');
  })
  $('#collapseList').unbind('click').click(function() {
    $('.collapsed').removeClass('expanded');
    $('.collapsed').children('dl').hide('medium');
  })
}