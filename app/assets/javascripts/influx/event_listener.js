//= require influx/spikes

Influx.EventListener = function() {
  var json_response,
      total_count = $('#total_count');


  window.source = new EventSource('/subscriber');

  source.addEventListener("message", function(response) {
    json_response = JSON.parse(response.data);
    addSpikes();
    addCount();
  });

  source.onerror = function(error){
    source.close();
  };

  var addSpikes = function() {
    var lat  = json_response.coordinates.split(', ')[0];
    var long = json_response.coordinates.split(', ')[1];
    Influx.Spikes(lat, long);
  };

  var addCount = function() {
    total_count.val(json_response.count).fadeIn(500);
  };

};
