(function() {
  var link_els = document.getElementsByClassName('chart_select');

  for (var i = 0, len = link_els.length; i < len; i++) {
    link_els[i].addEventListener('click', function() {
      var id = this.getAttribute('id');

      switchToChart(id);
    });  
  }

  function switchToChart(id) {
    var link_els = document.getElementsByClassName('chart_select'),
        chart_els = document.getElementsByClassName('chart'),
        link_id = id,
        chart_id = id.split('_').slice(0, 2).join('_'),
        link = document.getElementById(link_id),
        chart = document.getElementById(chart_id);

    for (var i = 0, len = link_els.length; i < len; i++) {
      link_els[i].className = 'chart_select'; // Remove active class;
    }

    for (var j = 0, len = chart_els.length; j < len; j++) {
      chart_els[j].style.opacity = '0.0'; // fade all out;
    }

    link.className += ' active';
    chart.style.opacity = '1.0';
  }
})();