<template lang="html">
<div>
  Who Needs a Home?
  <form v-on:submit='submit($event)'>
  	<br>
	<span>What is the size of your group/How many persons?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
  	<input v-model='total' type='text'>
	<p></p>

	<span>What is the demographic?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
	<textarea v-model="demographic" placeholder="ex. middle-aged man"></textarea>
	<p></p>

	<span>Does anyone have any of the following disabilities:</span>
		<br>
		<input type="checkbox" id="one" value="Blindness" v-model="one">
		<label for="one">Blindness</label>
		<br>
		<input type="checkbox" id="two" value="Deafness" v-model="two">
		<label for="two">Deafness</label>
		<br>
		<input type="checkbox" id="three" value="Wheelchair" v-model="three">
		<label for="three">Wheelchair Accessability</label>
		<br>
		<input type="checkbox" id="four" value="Intellectual" v-model="four">
		<label for="four">Intellectual Disability</label>
		<br>
		<input type="checkbox" id="five" value="None" v-model="five">
		<label for="five">None</label>
		<br>

	<span>Any other factors that are important to know/special requests?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
	<textarea v-model="special" placeholder="ex. someone has a dog allergy"></textarea>
	<p></p>

  	<input type='submit'>
  </form>

</div>

</template>

<script>
import HomeAPI from '@/services/HomeAPI.js'
export default {

data: {
    total: null,
    demographic: null,
    special: null,
    accessibility: null
  },
  methods:{
    async submit (evt) {
    	evt.preventDefault()
		var json = {
			total: this.total,
			demographic: this.demographic,
			accessibility: {
				Blindness: this.one,
				Deafness: this.two,
				Wheelchair: this.three,
				Intellectual: this.four,
				None: this.five
			},
			special: this.special
		}
		const response = await HomeAPI.getFind(json)
      	var data = response.data
    	console.log(json)

    }
  }

}
</script>

<style lang="css">
input[type = text],textarea{
	color:black;
}  
</style>

