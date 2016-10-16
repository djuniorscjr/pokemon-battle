<template>
    <div class="col-lg-4">
        <h1>
            <span class="label label-default">Jogador {{player}}</span>
        </h1>
        <loading :bool="loading || inUse"/>
        <pokemon :profile="profile" v-if="profile.name"/>
        <selected :disabled="loading || inUse" v-if="!profile.name" :pokemons="pokemons" @selected="onSelected"/>
    </div>
</template>

<script>
import Selected from './Selected'
import Pokemon from './Pokemon'
import Loading from './Loading'
import Service from '../service/'
export default {
  data () {
    return {
      inUse: false
    }
  },
  props: {
    loading: Boolean,
    profile: Object,
    pokemons: Array,
    player: Number
  },
  components: {
    Selected, Pokemon, Loading
  },
  methods: {
    onSelected (item) {
      this.inUse = true
      Service.getPokemon(item.resource_uri)
        .then((resp) => {
          this.$emit('player', item.name, resp.attack, resp.defense, resp.image, this.player)
        }, (error) => {
          console.log('error', error)
        }).then(_ => {
          this.inUse = false
        })
    }
  }
}
</script>
