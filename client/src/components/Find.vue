<template lang="html">
<div class='wrapper pure-u-1 pure-g'>
  <form class='host-form' v-on:submit='submit($event)'>
    <div v-if='question == -1'>
      <h2 class='question'>What is the size of your group/How many persons?</h2>
      <vue-slider v-model="total" :min='1' :max='20' :tooltipStyle='{"backgroundColor": "#666", "borderColor": "#666"}' :bgStyle='{"backgroundColor": "#666"}' :processStyle='{"backgroundColor": "#ccc"}'></vue-slider>
      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>
    <div v-if='question == 0'>
      <h2 class='question'>Who needs a host?</h2>
      <div class="pretty p-icon p-round p-jelly">
	        <input type="checkbox" id="one" value="Family/Group" v-model="family">
	        <div class="state p-danger">
	            <i class="icon mdi mdi-check"></i>
	            <label>Family/Group</label>
	        </div>
	     </div>
       <div class="pretty p-icon p-round p-jelly">
 	        <input type="checkbox" id="one" value="Adult Male" v-model="kids">
 	        <div class="state p-danger">
 	            <i class="icon mdi mdi-check"></i>
 	            <label>Kids</label>
 	        </div>
 	     </div>
       <div class="pretty p-icon p-round p-jelly">
 	        <input type="checkbox" id="one" value="Adult Male" v-model="adultMale">
 	        <div class="state p-danger">
 	            <i class="icon mdi mdi-check"></i>
 	            <label>Adult Male</label>
 	        </div>
 	     </div>
       <div class="pretty p-icon p-round p-jelly">
 	        <input type="checkbox" id="one" value="Adult Female" v-model="adultFemale">
 	        <div class="state p-danger">
 	            <i class="icon mdi mdi-check"></i>
 	            <label>Adult Female</label>
 	        </div>
 	     </div>
       <div class="pretty p-icon p-round p-jelly">
 	        <input type="checkbox" id="one" value="Elderly Male" v-model="elderMale">
 	        <div class="state p-danger">
 	            <i class="icon mdi mdi-check"></i>
 	            <label>Elderly Male</label>
 	        </div>
 	     </div>
       <div class="pretty p-icon p-round p-jelly">
 	        <input type="checkbox" id="one" value="Elderly Female" v-model="elderFemale">
 	        <div class="state p-danger">
 	            <i class="icon mdi mdi-check"></i>
 	            <label>Elderly Female</label>
 	        </div>
 	     </div>


      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>
    <div v-if='question == 1'>
      <h2 class='question'>Does anyone have any of the following disabilities:</h2>
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
		<br>

      <div class='next-button' v-on:click='click()' >
        Next
      </div>
    </div>

    <div v-if='question == 2'>
      <h2 class='question'>Any other factors that are important to know/special requests?</h2>
      <input v-model='special' placeholder="ex. a member is allergic to dogs" type='text'>
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
    props: ['location'],
data () {

	return {
    question: -1,
    total: 1,
    demographic: null,
    special: null,
    accessibility: null,
    family: null,
    kids: null,
    adultMale: null,
    adultFemale: null,
    elderMale: null,
    elderFemale: null,
    one: false,
    two: false,
    three: false,
    four: false
	}
  },
  methods:{
    async submit (evt) {
    	evt.preventDefault()
		var json = {
      location: this.location,
			total: this.total,
      demographic: {
        family: this.family,
        kids: this.kids,
        adultMale: this.adultMale,
        adultFemale: this.adultFemale,
        elderMale: this.elderMale,
        elderFemale: this.elderFemale
      },
			accessibility: {
				Blindness: this.one,
				Deafness: this.two,
				Wheelchair: this.three,
				Intellectual: this.four
			},
			special: this.special
		}
		  const response = await HomeAPI.getFind(json)
      var data = response.data
      this.$emit('finish', data)

    },
    click: function() {
      this.question += 1
    }
  }

}
</script>

<style lang="css" scoped>

  .pretty.p-icon {
    margin: 5px 0;
    float: left;
    clear: both;
  }
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
