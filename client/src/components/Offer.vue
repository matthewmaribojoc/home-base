<template lang="html">
<div>
  Home Information
  <form v-on:submit='submit($event)'>
  	<br>
	<span>How many beds/rooms are you willing to offer?</span>
  <br />
  	<input v-model='rooms' type='text'>
	<p></p>

	<span>What is the maximum amount of people you would be willing to host?</span>
  <br />
  	<input v-model='people' type='text'>
	<p></p>

	<span>Any limitations on people you will accept?</span>
  <br />
	<textarea v-model="limitations" placeholder="ex. you would feel uncomfortable with a drug addict"></textarea>
	<p></p>

	<span>Does your home have accessibility/disability accommodations?</span>
  <br />
	<textarea v-model="accessibility" placeholder="ex. you have wheelchair accessibility"></textarea>
	<p></p>

	<span>Do you have pets?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
  	<input v-model='napetsme' type='text'>
	<p></p>

	<span>Are there anything else you want us to know?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
	<textarea v-model="special" placeholder=""></textarea>
  <br />
	<textarea v-model="other" placeholder=""></textarea>
	<p></p>

  	<input type='submit'>
  </form>

</div>

</template>

<script>
import HomeAPI from '@/services/HomeAPI.js'
export default {

  data () {
    return {
      rooms: null,
      people: null,
      limitations: null,
      accessibility: null,
      pets: null,
      other: null
    }
  },
  methods:{
    async submit (evt) {
    	evt.preventDefault()
		var json = {
			rooms: this.rooms,
			people: this.people,
			limitations: this.limitations,
			accessibility: this.accessibility,
			pets: this.pets,
			special: this.special
		}
		const response = await HomeAPI.getDetails(json)
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
