<template lang="html">
  <div id='map-wrapper'>
    <div id='matcher'>
      <div class='no-results' v-if='homes.length == 0'>
        Sorry, no results found.
      </div>
      <div class='home-option' v-for='home in homes'  v-if='home != null && home.home.location != null && home.home.location.address != null'>
        <h2>{{home.home.location.address.freeformAddress}}</h2>
        <ul class='services'>
          <li>
            Can accomodate {{home.home.rooms}} person(s).
          </li>
          <li v-if='home.home.kids'>
            <span class='home-services' >Kid Friendly <i class="fas fa-baby"></i> </span>
          </li>
          <li v-if='home.home.accessibility.Blindness'>
            <span class='home-services' >Visually Impaired Services <i class="fas fa-blind"></i></span>
          </li>
          <li v-if='home.home.accessibility.Deafness'>
            <span class='home-services' >Hearing Impaired Services <i class="fas fa-wheelchair"></i></span>
          </li>
          <li v-if='home.home.accessibility.Intellectual'>
            <span class='home-services' > Intellectual Disability Services <i class="fas fa-puzzle-piece"></i></span>
          </li>
          <li v-if='home.home.limitations != null && home.home.limitations.length > 0'>
            Owner's Restrictions: {{home.home.limitations}}
          </li>
          <li v-if='home.home.special != null && home.home.special.length > 0'>
            Owner's Notes: {{home.home.special}}
          </li>
        </ul>
        <div class='button-ctr'>
          <div class='view-on-map' v-on:click='zoom(home)'>
            View on Map
          </div>
          <div class='contact' v-on:click='email(home.home)'>
            Match
          </div>
        </div>



      </div>
    </div>
    <div id='map'>

    </div>

  </div>
</template>

<script>
import HomeAPI from '@/services/HomeAPI.js'
var map;
export default {
  props: ['homes'],
  data () {
    return {

    }
  },
  mounted () {
    /* Instantiate map to the div with id "map"
      specified center point [longitude, latitude] and zoom level*/
    map = new atlas.Map("map", {
      center: [-79.9959, 40.44],
      zoom: 13,

      //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'ioE_-AdAyyS3-W9gRuNGaa4MMtf6OAYzjQn_nhKUnX4'
      }
    });

    map.events.add('ready', this.displayPins);
  },
  methods: {
    async email (home) {
      const response = await HomeAPI.sendMatchEmail(home.email)
      this.$router.push({ path: 'match-found' })

    },
    zoom (place) {
      var position = [place.home.location.viewport.topLeftPoint.lon, place.home.location.viewport.topLeftPoint.lat]
      map.setCamera({
          center: position,
          zoom: 15
      });
    },
    displayPins () {
      var dataSource = new atlas.source.DataSource();
      map.sources.add(dataSource);

      for (var i = 0; i < this.homes.length; i++) {
        if (this.homes[i].home.location == null) {
          continue
        }
        var position = [this.homes[i].home.location.position.lon, this.homes[i].home.location.position.lat]
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
  #map-wrapper {
    width: 100%;
    height: 100%;
  }

  #matcher {
    float: left;
    width: 40%;
    height: 100%;
    color: black;
    display: inline-block;
    max-height: 100%;
    overflow-y: scroll;
  }
  #map {
    width: 60%;
    height: 100%;
    color: black;
    display: inline-block;
  }

  .home-option {
    margin: 10px 20px;
    background-color: white;
    box-sizing: border-box;
    border-radius: 8px;
    height: 240px;
  }

  h2 {
    margin: 0;
    margin-bottom: 5px;
    width: 100%;
    background-color: #ff7675;
    color: white;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
  }

  ul.services {
    margin: 10px 0;
    font-size: 100%;
    color: #777;
  }

  .button-ctr {
    width: 300px;
    margin: 25px auto;
  }
  .contact {
    width: 100px;
    background-color: #00b894;
    padding: 10px 20px;
    color: white;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    float: left;

  }

  .view-on-map {
    width: 100px;
    background-color: #aaa;
    padding: 10px 20px;
    color: white;
    float: left;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    margin-right: 10px;
  }

  .no-results {
    color: white;
  }

</style>
