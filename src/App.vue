<template>
  <div id="app" class="container-fluid">
    <div class="jumbotron">
      <h1>Batalha de Pokemons</h1>
      <p class="lead">Busque e selecione um pokemon para cada jogador e inicie a batalha. Bom jogo!</p>
    </div>
    <game/>
  </div>
</template>

<script>
import Game from './components/Game'
export default {
  components: {
    Game
  }
}
</script>
<style>
.container-fluid {
  padding: 5px;
  margin: 20px auto;
}
</style>