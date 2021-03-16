<template>
  <div class="dogs-index">
    <h1>Featured Furiends</h1>
    <div class="info" v-for="dog in dogs" v-bind:key="dog.id">
      <h2>{{ dog.name }}</h2>
      <img class="img" v-bind:src="dog.image" v-bind:alt="dog.name" />
      <p><a v-bind:href="`/dogs/${dog.id}`">More Info</a></p>
    </div>
  </div>
</template>

<style>
.dogs-index {
  margin-top: 5rem;
  width: 95%;
  text-align: center;
}
.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  margin-bottom: 1rem;
}
.info {
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
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
