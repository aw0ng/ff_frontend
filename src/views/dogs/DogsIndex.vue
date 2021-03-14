<template>
  <div class="dogs-index">
    <h1>Featured Furiends</h1>
    <div v-for="dog in dogs" v-bind:key="dog.id">
      <h2>{{ dog.name }}</h2>
      <img class="resize" v-bind:src="dog.image" v-bind:alt="dog.name" />
      <a v-bind:href="`/dogs/${dog.id}`">More Info</a>
      <!-- <button v-on:click="showRecommendation(currentDog)">Recommendation</button> -->
    </div>
    <!-- <dialog id="dog-recommendations">
      <form method="dialog">
        <h1>Recommendation</h1>
        <p>{{ currentDog.photo }}</p>
        <p>Name: {{ currentDog.name }}</p>
        <p>Owner: {{ currentDog.user }}</p>
        <p>Breed: {{ currentDog.breed }}</p>
        <p>Weight: {{ currentDog.weight }} lbs</p>
        <p>Activity Level: {{ currentDog.min_of_activity }} minutes/day</p>
        <p>Daily Calories: {{ currentDog.daily_kcal }}</p>
        <p>Diet: {{ currentDog.diet }}</p>
        <p>Fitness: {{ currentDog.fitness }}</p>
        <button>Close</button>
      </form>
    </dialog> -->
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
      currentDog: {},
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

// FIX BROKEN MODAL
