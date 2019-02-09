<template lang="html">
<div class='wrapper pure-u-1 pure-g'>
  <form class='host-form' v-on:submit='submit($event)'>
    <div v-if='question == -1'>
      <h2 class='question'>What's your address?</h2>
      <input v-model='rawAddress' placeholder="7459 Cherry Lane, Fairfax, VA, 22032" type='text'>
      <div v-if='rawAddress != ""' class='next-button' v-on:click='click()' >
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
      <h2 class='question'>Does your home have accommodations for any of the following disabilities:</h2>
        <div class="pretty p-icon p-round p-jelly">
            <input type="checkbox" id="one" value="Blindness" v-model="one">
            <div class="state p-danger">
                <i class="icon mdi mdi-check"></i>
                <label>Blindness</label>
            </div>
         </div>
         <br>

        <div class="pretty p-icon p-round p-jelly">
        <input type="checkbox" id="two" value="Deafness" v-model="two">
            <div class="state p-danger">
                <i class="icon mdi mdi-check"></i>
                <label>Deafness</label>
            </div>
         </div>
         <br>

        <div class="pretty p-icon p-round p-jelly">
        <input type="checkbox" id="three" value="Wheelchair" v-model="three">
            <div class="state p-danger">
                <i class="icon mdi mdi-check"></i>
                <label>Wheelchair Accessability</label>
            </div>
         </div>
         <br>

        <div class="pretty p-icon p-round p-jelly">
        <input type="checkbox" id="four" value="Intellectual" v-model="four">
            <div class="state p-danger">
                <i class="icon mdi mdi-check"></i>
                <label>Intellectual Disability</label>
            </div>
         </div>
        <br>
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
      <div v-if='email.length > 0' class='next-button' v-on:click='click()' >
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
      rooms: 1,
      kids: false,
      address: "",
      rawAddress: "",
      limitations: null,
      accessibility: null,
      email: "",
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
  			accessibility: {
          Blindness: this.one,
          Deafness: this.two,
          Wheelchair: this.three,
          Intellectual: this.four
        },
        email: this.email,
  			pets: this.pets,
  			special: this.special
  		}
  		const response = await HomeAPI.getDetails(json)
      this.$router.push({ path: 'registration' })
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
  .pretty.p-icon {
    margin: 5px 0;
    float: left;
    clear: both;
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
