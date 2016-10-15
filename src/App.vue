<template>
  <div id="app" class="container">
    <section v-if="loading && player == 1" class="content"> 
      CARREGANDO
    </section>
    <section v-else class="content">
      <h1>Player 1</h1>
      <pokemon :profile="playerOne" v-if="playerOne.name"></pokemon>
      <selected v-if="!playerOne.name" :pokemons="pokemons" @selected="onSelected" :player="1"></selected>
    </section>
    <section>
       <img class="vs" src="./assets/vs.png"> 
       <button v-show="playerOne.name!=='' && playerTwo.name!=='' && message==''" class="btn" @click="play">Jogar</button>
       <button v-show="message!==''" class="btn" @click="init">Voltar</button> 
       <strong>{{message}}</strong>
    </section>
    <section v-if="loading && player == 2" class="sidebar">
      CARREGANDO
    </section>
    <section v-else class="sidebar">
      <h1>Player 2</h1>
      <pokemon :profile="playerTwo" v-if="playerTwo.name"></pokemon>
      <selected v-if="!playerTwo.name" :pokemons="pokemons" @selected="onSelected" :player="2"></selected>
    </section>
  </div>
</template>

<script>
import Selected from './components/Selected'
import Pokemon from './components/Pokemon'
const URL = 'http://pokeapi.co'
export default {
  data () {
    return {
      loading: false,
      player: 0,
      message: '',
      pokemons: [],
      playerOne: {image: '', name: '', attack: 0, defense: 0},
      playerTwo: {image: '', name: '', attack: 0, defense: 0}
    }
  },
  components: {
    Selected, Pokemon
  },
  mounted () {
    this.loading = true
    this.$http.get(URL + '/api/v1/pokedex/1/')
      .then((success) => {
        this.pokemons = success.data.pokemon
      }, (error) => {
        console.log('error', error)
      }).then(_ => {
        this.loading = false
      })
  },
  methods: {
    onSelected (item, player) {
      this.player = player
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
          this.setPlayer(name, attack, defense, resImg.image)
        }).then(_ => {
          this.loading = false
        })
      } else {
        this.setPlayer(name, attack, defense, undefined)
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
    },
    setPlayer (name, attack, defense, img) {
      let gamer = this.player === 1 ? this.playerOne : this.playerTwo
      gamer.name = name
      gamer.attack = attack
      gamer.defense = defense
      gamer.image = img === undefined ? undefined : URL + img
    },
    play () {
      let one = this.playerTwo.defense / this.playerOne.attack
      let two = this.playerOne.defense / this.playerTwo.attack
      if (one > two) {
        this.message = 'Player 1 ganhou!'
      } else if (two > one) {
        this.message = 'Player 2 ganhou!'
      } else {
        this.message = 'Empate!'
      }
    },
    init () {
      this.playerOne = {image: '', name: '', attack: 0, defense: 0}
      this.playerTwo = {image: '', name: '', attack: 0, defense: 0}
      this.message = ''
    }
  }
}
</script>
<style>
@import url(http://fonts.googleapis.com/css?family=Open+Sans);

body { 
  font-family: 'Open Sans', sans-serif;
  color: #666;
}
.container {
	padding: 5px;
	width: 960px;
	margin: 20px auto;
}
.vs {
  width: 10%;
  text-align: center;
}

</style>