jQuery(document).ready(function() {

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    jQuery('#url-select').val(tabs[0].url);
  });


    //selectors
  var browserSelect = jQuery('#browser-select');
  var osSelect = jQuery('#os-select');

  //init all global vars
  var osSelectData = [];
  var browserSelectData = [];
  var globalData = null;
  var deviceType = jQuery('input[name=device-type]:checked').val();

  var type = (deviceType == 'desktop') ? 'browsers' : 'devices';

  //init both select2
  browserSelect.select2({
    data: browserSelectData
  }).select2('enable', false);

  osSelect.select2({
    data: osSelectData
  }).select2('enable', false);

  //change listener for os so browsers/devices can be loaded
  jQuery('input[name=device-type]').change(function(e) {
    deviceType = jQuery('input[name=device-type]:checked').val();
    loadOS();
    browserSelectData = [];
    browserSelect.select2({
      data: browserSelectData
    }).select2('enable', false);

  });

  //get browsers list
  jQuery.ajax({
    url: 'http://www.browserstack.com/list-of-browsers-and-platforms.json?product=live',
    datatype: 'json',
    success: function(response) {
      globalData = response;
      loadOS();
      osSelect.change(function(e) {
        loadBrowsers(e.val);
      });

    },
    failure: function(reponse) {

    }
  });

  //load the operating systems
  var loadOS = function() {
    osSelectData = [];
    for(var i in globalData[deviceType]) {
      if(globalData[deviceType].hasOwnProperty(i)) {
        osSelectData.push({
          id: i,
          text: globalData[deviceType][i]['os_display_name']
        })
      }
    }

    osSelect.select2('data', {});
    osSelect.select2({
      data: osSelectData
    });
    osSelect.select2('enable', true);
  };

  //load browsers depending on operating system selected.
  var loadBrowsers = function(index) {
    browserSelectData = [];
    type = (deviceType == 'desktop') ? 'browsers' : 'devices';
    for(var i in globalData[deviceType][index][type]) {
      if(globalData[deviceType][index][type].hasOwnProperty(i)) {
        browserSelectData.push({
          id: i,
          text: globalData[deviceType][index][type][i]['display_name']
        });
      }
    }
    browserSelect.select2('data', {});
    browserSelect.select2({
      data: browserSelectData
    });
    browserSelect.select2('enable', true);
  };


  jQuery('#open-bs').click(function(e) {
    var bs_params = {
      os: "Windows",
      os_version: "7",
      browser: "IE",
      browser_version: "8.0",
      zoom_to_fit: true,
      full_screen: true,
      autofit: true,
      url: jQuery('#url-select').val(),
      resolution: "2048x1536",
      speed: 1,
      start: true
    }

    newURL = 'http://browserstack.com/start#' + jQuery.param(bs_params);
    chrome.tabs.create({ url: newURL });
    e.preventDefault();
  });


});