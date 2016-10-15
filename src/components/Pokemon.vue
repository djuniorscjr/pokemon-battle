<template>
  <div>
    <a href="#" class="thumbnail">
      <img v-bind:src="profile.image" />
    </a>
    <p>
      <span class="label label-info">{{profile.name}}</span>
    </p>
    <p>
      Attack <span class="badge">{{profile.attack}}</span>
      Defense <span class="badge">{{profile.defense}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    profile: Object
  }
}
</script>