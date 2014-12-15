jQuery(document).ready(function() {
  jQuery.ajax({
    url: 'http://www.browserstack.com/list-of-browsers-and-platforms.json?product=live',
    datatype: 'json',
    success: function(response) {
      console.log(response);
    },
    failure: function(reponse) {

    }
  });
});