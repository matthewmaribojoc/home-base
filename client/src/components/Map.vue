<template lang="html">
  <div id='map'>

  </div>
</template>

<script>
export default {
  mounted () {
    /* Instantiate map to the div with id "map"
      specified center point [longitude, latitude] and zoom level*/
    var map = new atlas.Map("map", {
      center: [-79.9959, 40.43],
      zoom: 14,

      //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'ioE_-AdAyyS3-W9gRuNGaa4MMtf6OAYzjQn_nhKUnX4'
      }
    });




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
