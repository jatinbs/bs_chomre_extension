jQuery(document).ready(function() {
  var operatingSystemsSelect2 = [];
  var browsersSelect2 = [];
  var globalData = null;
  var deviceType = jQuery('input[name=device-type]:checked').val();


  jQuery('#browser-select').select2({
    data: browsersSelect2
  }).select2('enable', false);

  //get browsers list
  jQuery.ajax({
    url: 'http://www.browserstack.com/list-of-browsers-and-platforms.json?product=live',
    datatype: 'json',
    success: function(response) {
      globalData = response;
      console.log(deviceType);
      globalData[deviceType];
      for(var i in globalData[deviceType]) {
        console.log(i);
        operatingSystemsSelect2.push({
          id: i,
          text: globalData[deviceType][i].os_display_name
        })
      }
      jQuery('#os-select').select2({
        data: operatingSystemsSelect2
      }).change(function(e) {

        //set browser/device select
        browsersSelect2 = [];
        for(var i in globalData[deviceType][e.val].browsers) {
          browsersSelect2.push({
            id: i,
            text: globalData[deviceType][e.val].browsers[i].display_name
          });
        }
        jQuery('#browser-select').select2('data', {});
        jQuery('#browser-select').select2({
          data: browsersSelect2
        });
        jQuery('#browser-select').select2('enable', true);

      });

    },
    failure: function(reponse) {

    }
  });
});