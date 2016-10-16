<template>
    <div class="loading" v-if="bool">
        <div class="ball"></div>
        Carregando...
    </div>
</template>
<script>
export default {
  props: {
    bool: Boolean
  }
}
</script>
<style>
.loading {
  margin-top: 30px;
  margin-left: 30px;
  font-size: 30px;
  font-family: sans-serif;
  font-weight: bold;
}
.ball {
  display: inline-block;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
  box-shadow:inset 5px -10px 50px -20px #000;
  animation: loading 1s infinite;
}


@keyframes loading {
  0%, 100% {
    transform: translateY(0px);
    animation-timing-function: ease-out;
  }
  50% {
    transform: translateY(-30px);
    animation-timing-function: ease-in;
  }
}
</style>