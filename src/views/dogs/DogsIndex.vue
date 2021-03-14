<template>
  <div class="dogs-index">
    <h1>Featured Furiends</h1>
    <div v-for="dog in dogs" v-bind:key="dog.id">
      <h2>{{ dog.name }}</h2>
      <img class="resize" v-bind:src="dog.image" v-bind:alt="dog.name" />
      <a v-bind:href="`/dogs/${dog.id}`">More Info</a>
    </div>
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
      dogs: [],
    };
  },
  created: function() {
    axios.get("/api/dogs").then(response => {
      console.log("dogs index", response);
      this.dogs = response.data;
    });
  },
  methods: {
    // showRecommendation: function() {
    //   this.currentDog = dog;
    //   document.querySelector("dog-details").showModal();
    // },
  },
};
</script>
