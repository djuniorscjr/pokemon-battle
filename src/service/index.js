import Vue from 'vue'
import VueResource from 'vue-resource'
const URL = '//pokeapi.co'

Vue.use(VueResource)

export default {
  all () {
    return Vue.http.get(URL + '/api/v1/pokedex/1/')
      .then((success) => {
        return success.data.pokemon
      }, (error) => {
        console.log('error', error)
        return false
      })
  },

  getPokemon (resource) {
    return Vue.http.get(URL + '/' + resource)
      .then((success) => this.setPokemonToPlayer(success),
      (error) => {
        console.log('error', error)
        return false
      })
  },

  setPokemonToPlayer (obj) {
    let result = {}
    result.attack = obj.data.attack
    result.defense = obj.data.defense
    if (obj.data.sprites.length > 0) {
      return this.getImage(obj.data.sprites[0].resource_uri)
        .then((resp) => {
          result.image = resp.image
          return result
        })
    } else {
      return result
    }
  },

  getImage (path) {
    return Vue.http.get(URL + path)
      .then((success) => {
        return success.data
      }, (error) => {
        console.log('error', error)
        return false
      })
  }
}
