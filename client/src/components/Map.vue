<template lang="html">
  <div id='map'>

  </div>
</template>

<script>
import HomeAPI from '@/services/HomeAPI.js'
var map;
export default {
  data () {
    return {
      homes: []
    }
  },
  mounted () {
    /* Instantiate map to the div with id "map"
      specified center point [longitude, latitude] and zoom level*/
    map = new atlas.Map("map", {
      center: [-79.9959, 40.43],
      zoom: 14,

      //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'ioE_-AdAyyS3-W9gRuNGaa4MMtf6OAYzjQn_nhKUnX4'
      }
    });
    map.events.add('ready', this.loadPins);
  },
  methods: {
    displayPins () {
      /*Create a data source and add it to the map*/

    },
    async loadPins () {
      const response = await HomeAPI.getHomes()
      var homes = response.data
      var dataSource = new atlas.source.DataSource();
      map.sources.add(dataSource);

      for (var i = 0; i < homes.length; i++) {
        var position = [homes[i].location.position.lon, homes[i].location.position.lat]
        console.log(position)
        dataSource.add(new atlas.data.Feature(new atlas.data.Point(position), {
          name: 'point',
          description: 'Microsoft Building 41'
        }));
      }
      //Create a layer to render point data.
      var symbolLayer = new atlas.layer.SymbolLayer(dataSource);
      //Add the polygon and line the symbol layer to the map.
      map.layers.add([symbolLayer]);
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
