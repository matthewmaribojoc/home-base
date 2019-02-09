<template lang='html'>
  <div>
    {{homes}}
  </div>
</template>

<script>
import HomeAPI from '@/services/HomeAPI.js'

export default {
  data () {
    return {
      homes: []
    }
  },
  mounted () {
    this.loadHomes()
  },
  methods: {
    async loadHomes () {
      const response = await HomeAPI.getHomes()
      this.homes = response.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='css' scoped>

</style>
