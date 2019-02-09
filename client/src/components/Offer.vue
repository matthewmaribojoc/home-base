<template lang="html">
<div>
  Home Information
  <form v-on:submit='submit($event)'>
  	<br>
	<span>How many beds/rooms are you willing to offer?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
  	<input v-model='rooms' type='text'>
	<p></p>

	<span>What is the maximum amount of people you would be willing to host?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
  	<input v-model='people' type='text'>
	<p></p>

	<span>Any limitations on people you will accept?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
	<textarea v-model="limitations" placeholder="ex. you would feel uncomfortable with a drug addict"></textarea>
	<p></p>

	<span>Does your home have accessibility/disability accommodations?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
	<textarea v-model="accessibility" placeholder="ex. you have wheelchair accessibility"></textarea>
	<p></p>

	<span>Do you have pets?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
  	<input v-model='napetsme' type='text'>
	<p></p>

	<span>Are there anything else you want us to know?</span>
		<p style="white-space: pre-line;">{{ message }}</p>
	<textarea v-model="other" placeholder=""></textarea>
	<p></p>

  	<input type='submit'>
  </form>

</div>

</template>

<script>
export default {

data: {
    rooms: null,
    people: null,
    limitations: null,
    accessibility: null,
    pets: null,
    other: null
  },
  methods:{
    submit (evt) {
    	evt.preventDefault()
    	alert(this.people)
    }
  }

}
</script>

<style lang="css">
  
</style>

