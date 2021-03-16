<template>
  <div class="dogs-show">
    <h2>{{ this.dog.name }}'s Recommendation</h2>
    <p></p>
    <p>Healthy Weight: {{ this.dog.breed.weight }} lbs</p>
    <p>Minimum Daily Activity: {{ this.dog.breed.min_of_activity }} minutes</p>
    <p>Daily Calories: {{ this.dog.breed.daily_kcal }}</p>
    <!-- <p>{{ this.dog.recommendations }}</p> -->
    <img class="resize" v-bind:src="dog.image" v-bind:alt="dog.name" />
    <p></p>
    <p><a class="back-to" href="/dogs">Back to Our Furiends</a></p>
  </div>
</template>

<style scoped>
.dogs-show {
  margin-top: 7em;
  margin-bottom: 2em;
}
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
      dog: { name: "", image: "", breed: {} },
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
