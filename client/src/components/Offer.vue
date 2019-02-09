<template lang="html">
<div class='wrapper pure-u-1 pure-g'>
  <form class='host-form' v-on:submit='submit($event)'>
    <div v-if='question == -1'>
      <h2 class='question'>What's your address?</h2>
      <input v-model='rawAddress' placeholder="7459 Cherry Lane, Fairfax, VA, 22032" type='text'>
      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>
    <div v-if='question == 0'>
      <h2 class='question'>How many bed spaces can you offer?</h2>
      <vue-slider v-model="rooms" :min='1' :max='50' :tooltipStyle='{"backgroundColor": "#666", "borderColor": "#666"}' :bgStyle='{"backgroundColor": "#666"}' :processStyle='{"backgroundColor": "#ccc"}'></vue-slider>
      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>
    <div v-if='question == 1'>
      <h2 class='question'>Are you willing to accommodate families with kids?</h2>
      <div class='btn-container'>
        <section class='yes-button' v-on:click='kids = true; click()'>
          Yes
        </section>
        <section class='no-button' v-on:click='kids = false; click()'>
          No
        </section>
      </div>
      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>
    <div v-if='question == 2'>
      <h2 class='question'>Any limitations on people you will accept?</h2>
      <input v-model='limitations' placeholder="ex. you would feel uncomfortable with a drug addict" type='text'>
      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>
    <div v-if='question == 3'>
      <h2 class='question'>Does your home have accessibility/disability accommodations?</h2>
      <input v-model='accessibility' placeholder="ex. you have wheelchair accessibility" type='text'>
      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>
    <div v-if='question == 4'>
      <h2 class='question'>Do you have pets?</h2>
      <div class='btn-container'>
        <section class='yes-button' v-on:click='pets = true; click()'>
          Yes
        </section>
        <section class='no-button' v-on:click='pets = false; click()'>
          No
        </section>
      </div>
      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>
    <div v-if='question == 5'>
      <h2 class='question'>What is your email?</h2>
    	<input v-model='email' type='text'>
      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>
    <div v-if='question == 6'>
      <h2 class='question'>Are there anything else you want us to know?</h2>
      <input v-model='special' placeholder="ex. you have wheelchair accessibility" type='text'>
      <br />
      <input type='submit'>
    </div>

  </form>

</div>

</template>

<script>
import HomeAPI from '@/services/HomeAPI.js'
import VueSlider from 'vue-slider-component'
export default {
  components: {
    VueSlider
  },
  data () {
    return {
      question: -1,
      rooms: null,
      kids: null,
      address: null,
      rawAddress: null,
      limitations: null,
      accessibility: null,
      email: null,
      pets: null,
      other: null
    }
  },
  methods: {
    async submit (evt) {
    	evt.preventDefault()
  		var json = {
  			rooms: this.rooms,
  			kids: this.kids,
        location: this.location,
  			limitations: this.limitations,
  			accessibility: this.accessibility,
        email: this.email,
  			pets: this.pets,
  			special: this.special
  		}
  		const response = await HomeAPI.getDetails(json)
    },
    click: function() {
      if (this.question == -1) {
        this.loadAddress()
      }
      this.question += 1
    },
    async loadAddress () {
      const response = await HomeAPI.getLocation(this.rawAddress)
      this.location = response.data
    }
  }


}
</script>

<style lang="css" scoped>
  .wrapper {
    background-color: white;
    color: black;
    padding: 20px;
    width: 600px;
    border-radius: 10px;
  }
  .host-form input[type = text], .host-form textarea{
  	color: black;
    margin: 0 auto;
    width: 80%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: block;
    padding: 10px;
  }

  .host-form input[type=submit] {
    margin: 20px;
    clear: both;
    width: 100px;
    float: right;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    background-color: #74b9ff;
    outline: 0;
    border: 0;
  }
  .next-button {
    margin: 20px;
    clear: both;
    width: 100px;
    float: right;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    background-color: #74b9ff;
    cursor: pointer;
  }
  .btn-container {
    width: 100%;
    text-align: center;
  }
  .yes-button, .no-button {
    background-color: #ccc;
    border-radius: 7px;
    display: inline-block;
    margin: 10px;
    width: 50px;
    padding: 15px 20px;
    cursor: pointer;
  }
  .yes-button:hover, .no-button:hover {
    background-color: #bbb;
  }
  h2.question {
    color: #222;
    margin-bottom: 40px;
  }
</style>
