<template>
    <div class="col-lg-4">
        <h1>
            <span class="label label-default">Jogador {{player}}</span>
        </h1>
        <loading :bool="loading"/>
        <pokemon :profile="profile" v-if="profile.name"/>
        <selected :disabled="loading" v-if="!profile.name" :pokemons="pokemons" @selected="onSelected"/>
    </div>
</template>

<script>
import Selected from './Selected'
import Pokemon from './Pokemon'
import Loading from './Loading'
const URL = '//pokeapi.co'
export default {
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
      this.loading = true
      this.$http.get(URL + '/' + item.resource_uri)
        .then((resp) => {
          this.setImage(resp.data.sprites, item.name, resp.data.attack, resp.data.defense)
        }, (error) => {
          console.log('error', error)
        })
    },
    setImage (sprites, name, attack, defense) {
      if (sprites.length > 0) {
        this.getImage(sprites[0].resource_uri).then((resImg) => {
          this.$emit('player', name, attack, defense, resImg.image, this.player)
        }).then(_ => {
          this.loading = false
        })
      } else {
        this.$emit('player', name, attack, defense, undefined, this.player)
        this.loading = false
      }
    },
    getImage (path) {
      return this.$http.get(URL + path)
        .then((resp) => {
          return resp.data
        }, (error) => {
          console.log('error', error)
        })
    }
  }
}
</script>