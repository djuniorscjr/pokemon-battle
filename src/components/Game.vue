<template>
    <div class="row">
      <player :loading="loading" :profile="playerOne" :pokemons="pokemons" 
          :player="1" @player="setPlayer"/>
      <div class="col-lg-4">
        <div>
          <img class="vs" src="../assets/vs.png">
          <p>
            <button v-show="playerOne.name!=='' && playerTwo.name!=='' && message==''" class="btn btn-primary" @click="play">Iniciar</button>
            <button v-show="message!==''" class="btn btn-default" @click="init">Voltar</button> 
          </p>
          <div class="alert alert-success" v-show="message!==''">
            {{message}}
          </div>
        </div>
      </div>
      <player :loading="loading" :profile="playerTwo" :pokemons="pokemons" 
          :player="2" @player="setPlayer"/>
    </div>
</template>

<script>
import Player from './Player'
const URL = '//pokeapi.co'
export default {
  data () {
    return {
      loading: false,
      message: '',
      pokemons: [],
      playerOne: {image: '', name: '', attack: 0, defense: 0},
      playerTwo: {image: '', name: '', attack: 0, defense: 0}
    }
  },
  components: {
    Player
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
    setPlayer (name, attack, defense, img, player) {
      let gamer = player === 1 ? this.playerOne : this.playerTwo
      gamer.name = name
      gamer.attack = attack
      gamer.defense = defense
      gamer.image = img === undefined ? './assets/img.png' : URL + img
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
.row {
  text-align: center;
}
.vs {
  width: 50%;
}

</style>