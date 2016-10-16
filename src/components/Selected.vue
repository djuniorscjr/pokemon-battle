<template>
  <div>
    <input :disabled="disabled" v-model="search" placeholder="Buscar pokemon...">
    <ul class="dropdown">
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
    player: Number,
    disabled: Boolean
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
<style>
  ul {
    padding-left: 0;
    width: 50%;
  }
  li {
    text-indent: -1em;
  }
  li:before {
    content: "+";
    padding-right: 5px;
  }
  li:hover {
    background-color: #eee;
  }
  .dropdown > li {
      display: block;
      padding: 3px 20px;
      clear: both;
      font-weight: 400;
      line-height: 1.42857143;
      color: #333;
      white-space: nowrap;
  }
  .dropdown {
      margin-left: 25%;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      display: block;
      float: left;
      min-width: 160px;
      font-size: 14px;
      text-align: left;
      list-style: none;
      background-color: #fff;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      border-radius: 4px;
      -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
      box-shadow: 0 6px 12px rgba(0,0,0,.175);
  }
</style>