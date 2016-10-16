<template>
  <div id="app" class="container-fluid">
    <div class="jumbotron">
      <h1>Batalha de Pokemons</h1>
      <p class="lead">Busque e selecione um pokemon para cada jogador e inicie a batalha. Bom jogo!</p>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <h1><span class="label label-default">Jogador 1</span></h1>
        <loading :bool="loading || player == 1"></loading>
        <pokemon :profile="playerOne" v-if="playerOne.name"></pokemon>
        <selected :disabled="loading || player == 1" v-if="!playerOne.name" :pokemons="pokemons" @selected="onSelected" :player="1"></selected>
      </div>
      <div class="col-lg-4">
        <div>
          <img class="vs" src="./assets/vs.png">
          <p>
            <button v-show="playerOne.name!=='' && playerTwo.name!=='' && message==''" class="btn btn-primary" @click="play">Iniciar</button>
            <button v-show="message!==''" class="btn btn-default" @click="init">Voltar</button> 
          </p>
          <div class="alert alert-success" v-show="message!==''">
            {{message}}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <h1><span class="label label-default">Jogador 2</span></h1>
        <loading :bool="loading || player == 2"></loading>
        <pokemon :profile="playerTwo" v-if="playerTwo.name"></pokemon>
        <selected :disabled="loading || player == 2" v-if="!playerTwo.name" :pokemons="pokemons" @selected="onSelected" :player="2"></selected>
      </div>
    </div>
  </div>
</template>

<script>
import Selected from './components/Selected'
import Pokemon from './components/Pokemon'
import Loading from './components/Loading'
const URL = '//pokeapi.co'
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
    Selected, Pokemon, Loading
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
      gamer.image = img === undefined ? './assets/img.png' : URL + img
      this.player = 0
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
.container-fluid {
	padding: 5px;
	margin: 20px auto;
}
.row {
  text-align: center;
}
.vs {
  width: 50%;
}

</style>