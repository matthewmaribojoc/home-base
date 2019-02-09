<template lang="html">
  <div class='container pure-g'>
    <div class='content pure-g'>
      <div class='tab-0 pure-u-1 pure-g' v-if='tab == 0'>
        <h1 class='pure-u-1'>I want to...</h1>
        <div v-on:click='nextTab($event)' class='button button-find pure-u-1-4'>
          Find a host
        </div>
        <div v-on:click='nextTab($event)' class='button button-host pure-u-1-4'>
          Host a neighbor
        </div>
      </div>
      <div class='tab-1 pure-u-1 pure-g' v-if='tab == 1'>
        <h1 class='pure-u-1'>Where are you?</h1>
        <form class='pure-u-1' v-on:submit='submitLocation($event)'>
          <input class='address-input' type='text' placeholder='Enter Your Address/Location' v-model='locationInput' />
        </form>
        <span class='location-check' v-if='locationError != ""'>
          <span class='location-check-text'>{{locationError}}</span>
        </span>
        <section class='location-check' v-else-if='locationTitle != ""'>
          <span class='location-check-text'>You're near {{locationTitle}}, right?</span>
          <br />
          <section v-on:click='nextTab($event)' class='button-small button-find pure-u-1-4'>
            Yes
          </section>
        </section>
      </div>
      <div class='tab-2 pure-u-1 pure-g' v-if='tab == 2 && type == "host"'>
        <Offer></Offer>
      </div>
      <div class='tab-2 pure-u-1 pure-g' v-if='tab == 2 && type == "find"'>
        <Find></Find>
      </div>
    </div>
  </div>
</template>

<script>
import HomeAPI from '@/services/HomeAPI.js'
import Offer from '@/components/Offer'
import Find from '@/components/Find'

export default {
  components: {
    Find, Offer
  },
  data() {
    return {
      tab: 0,
      type: 'host',
      location: null,
      locationError: '',
      locationInput: '',
      locationTitle: ''
    }
  },
  methods: {
    async nextTab (evt) {
      if (this.tab == 0) {
        if (evt.target.classList.contains('button-find')) {
          this.type = 'find'
        } else {
          this.type = 'host'
        }
      }

      this.tab += 1;
      if (this.tab == 2 && this.location != null) {
        const response = await HomeAPI.getWeather(this.location.viewPort.topLeftPoint.lat, this.location.viewPort.topLeftPoint.lon)
        var data = response.data
      }
    },
    async submitLocation (evt) {
      evt.preventDefault()
      const response = await HomeAPI.getLocation(this.locationInput)
      var data = response.data
      if (data == null || data.length == 0 || data.address == null) {
        this.locationError = 'Your location was not found. Please try again.'
      } else {
        this.locationError = ''
        this.locationTitle = data.address.municipality + ', ' + data.address.countrySubdivision
        this.location = data
      }
    }
  }
}
</script>

<style lang="css" scoped>

  .container {
    width: 100%;
  }
  .content {
    text-align: center;
    margin: 0 auto;
    margin-top: 200px;
  }

  h1 {
    font-size: 220%;
  }

  .button {
    height: 40px;
    outline: none;
    padding: 30px;
    background-color: #ff7675;
    border-bottom: 7px solid #b45b5a;
    display: inline-block;
    margin: 10px;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    line-height: 40px;
    vertical-align: middle;
    cursor: pointer;
    font-size: 110%;
    color: white;
    transition: 0.05s all ease-in-out;
    cursor: pointer;
  }

  .button-small {
    height: 40px;
    background-color: #ff7675;
    border-bottom: 7px solid #b45b5a;
    display: inline-block;
    margin: 10px;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    line-height: 40px;
    vertical-align: middle;
    cursor: pointer;
    color: white;
    font-size: 110%;
    cursor: pointer;
  }

  .button-small:hover {
    margin-top: 17px;
    border-bottom: none;
  }

  .button:hover{
    background-color: #e26969;
    margin-top: 17px;
    border-bottom: none;
  }

  input[type='text'] {
    color: black;
  }

  input.address-input {
    border: 0;
    outline: 0;
    width: 300px;
    height: 30px;
    padding: 10px 10px;
    margin-bottom: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .location-check-text {
  }

  .tab-1 {
    background-color: #fff;
    color: #222;
    border-radius: 10px;
  }

</style>
