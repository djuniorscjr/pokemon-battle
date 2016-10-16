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
      .then((success) => {
        let obj = success.data
        if (obj.sprites.length > 0) {
          return this.getImage(obj.sprites[0].resource_uri)
            .then((resp) => {
              return {
                attack: obj['attack'],
                defense: obj['defense'],
                image: resp['image']
              }
            })
        } else {
          return {
            attack: obj['attack'],
            defense: obj['defense'],
            image: undefined
          }
        }
      }, (error) => {
        console.log('error', error)
        return false
      })
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
