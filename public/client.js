// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  function ons(){
    var url = '/new/';
    url += document.usm.longurl.value;
    // repeat the above line for any other fields you may want to add
    window.location.href = url;
  }
});
