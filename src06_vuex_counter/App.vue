<template>
  <div>
    <p>click {{count}} times count is {{evenOrOdd}}</p>
    <button @click='increment'>+</button>
    <button @click='decrement'>-</button>
    <button @click='incrementIfOdd'>increment if odd</button>
    <button @click='incrementAsync'>increment async</button>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {

    computed: {
      /* count () {
        return this.$store.state.count
      },
      evenOrOdd () {
        return this.$store.getters.evenOrOdd
      }, */

      ...mapState(['count']),  // {count: () => this.$store.state['count']}
      ...mapGetters(['evenOrOdd']) // {evenOrOdd: () => this.$store.getters['evenOrOdd']}
    },

    methods: {
      /* increment () {
        // this.$store.dispatch('increment')
        this.$store.commit('INCREMENT')
      },
      decrement () {
         // this.$store.dispatch('decrement')
        this.$store.commit('DECREMENT')
      },
      incrementIfOdd () {
        this.$store.dispatch('incrementIfOdd')
      },
      incrementAsync () {
        console.log('---')
        this.$store.dispatch('incrementAsync')
      }, */
      ...mapMutations({
        increment: 'INCREMENT',
        decrement: 'DECREMENT',
      }),
      ...mapActions(['incrementIfOdd', 'incrementAsync']),
    }
  }

</script>
<style>

</style>
