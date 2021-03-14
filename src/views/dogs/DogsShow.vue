<template>
  <div class="dogs-show">
    <h2>{{ this.dog.name }}</h2>
    <p>{{ this.dog.recommendation }}</p>
    <img class="resize" v-bind:src="dog.image" v-bind:alt="dog.name" />
    <a href="/dogs">Back to Our Furiends</a>
  </div>
</template>

<style>
img.resize {
  max-width: 50%;
  max-height: 50%;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      dog: {},
      recommendations: [],
    };
  },
  created: function() {
    this.showDog();
  },
  methods: {
    showDog: function() {
      axios.get("/api/dogs/" + this.$route.params.id).then(response => {
        console.log(response.data);
        this.dog = response.data;
      });
    },
  },
};
</script>
