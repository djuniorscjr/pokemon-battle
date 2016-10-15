<template>
  <div>
      <img v-bind:src="profile.image" />
      <p><strong>{{profile.name}}</strong></p>
      <p>Attack: {{profile.attack}}, Defense: {{profile.defense}}</p>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object
  }
}
</script>