<template lang="html">
  <div id='map'>

  </div>
</template>

<script>
var map;
export default {
  mounted () {
    /* Instantiate map to the div with id "map"
      specified center point [longitude, latitude] and zoom level*/
    map = new atlas.Map("map", {
      center: [-122.1333, 47.63],
      zoom: 14,

      //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'ioE_-AdAyyS3-W9gRuNGaa4MMtf6OAYzjQn_nhKUnX4'
      }
    });
    map.events.add('ready', function () {

   /*Create a data source and add it to the map*/
  var dataSource = new atlas.source.DataSource();
  map.sources.add(dataSource);

  dataSource.add(new atlas.data.Feature(new atlas.data.Point([-122.1333, 47.63]), {
            name: 'point',
            description: 'Microsoft Building 41'
            }));

  //Create a layer to render point data.
  var symbolLayer = new atlas.layer.SymbolLayer(dataSource);
  //Add the polygon and line the symbol layer to the map.
  map.layers.add([symbolLayer]);

  //Create a popup but leave it closed so we can update it and display it later.
  popup = new atlas.Popup({
        position: [0, 0],
        pixelOffset: [0, -18],
        closeButton: false
         });
  //Add a hover event to the symbol layer.
  map.events.add('mouseover', symbolLayer, symbolFocused);

  map.events.add('mouseleave', symbolLayer, hidePopup);

});
  },
  methods: {
    async loadPins () {

    }
  }
}
</script>

<style rel="stylesheet" href="https://atlas.microsoft.com/sdk/css/atlas.min.css?api-version=2" type="text/css"></style>
<style lang="css" scoped>
  #map {
    width: 100%;
    height: 200%;
  }
</style>
