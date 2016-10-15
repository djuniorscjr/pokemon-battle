<template>
  <div>
    <input v-model="search">
    <ul>
        <li v-for="pokemon in filteredItem" @click="selectedPokemon(pokemon)">
          <span>{{pokemon.name}}</span>
        </li>
      </ul>
  </div>
</template>

<script>
import {isEmpty, orderBy, slice, filter} from 'lodash'
export default {
  data () {
    return {
      search: ''
    }
  },
  props: {
    pokemons: Array,
    player: Number
  },
  computed: {
    filteredItem () {
      const listOfPokemons = orderBy(this.pokemons, 'name')
      if (isEmpty(this.search)) {
        return []
      }
      return slice(filter(listOfPokemons, pokemon => pokemon.name.indexOf(this.search.toLocaleLowerCase()) > -1), 0, 5)
    }
  },
  methods: {
    selectedPokemon (pokemon) {
      this.search = ''
      this.$emit('selected', pokemon, this.player)
    }
  }
}
</script>