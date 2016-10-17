<template>
  <div>
    <img src="../assets/img.png" v-if="profile.image == undefined" />
    <img :src="profile.image" v-else />
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
