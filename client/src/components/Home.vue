<template lang="html">
  <div class='pure-g'>
    <div class='content pure-g'>
      <div class='tab-0' v-if='tab == 0'>
        <h1 class='pure-u-1'>I want to...</h1>
        <div v-on:click='nextTab()' class='button button-find pure-u-1-4'>
          Find a host
        </div>
        <div v-on:click='nextTab()' class='button button-find pure-u-1-4'>
          Host a neighbor
        </div>
      </div>
      <div class='tab-1' v-if='tab == 1'>
        <h1 class='pure-u-1'>What's Your Address?</h1>
        <form class='pure-u-1' v-on:submit='submitLocation($event)'>
          <input class='address-input pure-u-1-2' type='text' placeholder='Enter Your Address' v-model='locationInput' />
        </form>
        <span class='location-check pure-u-1' v-if='locationError != ""'>
          {{locationError}}
        </span>
        <span class='location-check pure-u-1' v-else-if='locationTitle != ""'>
          Are you in {{locationTitle}}?
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import HomeAPI from '@/services/HomeAPI.js'

export default {
  data() {
    return {
      tab: 0,
      locationError: '',
      locationInput: '',
      locationTitle: ''
    }
  },
  methods: {
    nextTab () {
      this.tab += 1;
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
      }
    }
  }
}
</script>

<style lang="css">
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
    transition: 0.05s all ease-in-out;
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
    height: 30px;
    padding: 10px 10px;
    margin-bottom: 40px
  }

</style>
