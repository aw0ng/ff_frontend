<template>
  <div class="dogs-new">
    <h1>New Furiend</h1>
    <form v-on:submit.prevent="createDog()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Name:
      <input type="text" v-model="newDogName" />
      Image:
      <input type="text" v-model="newDogImage" />
      Breed:
      <input type="text" v-model="newDogBreed" />
      Weight:
      <input type="text" v-model="newDogWeight" />
      Minutes of Activity Per Day:
      <input type="text" v-model="newDogMin_of_Activity" />
      Daily Calories:
      <input type="text" v-model="newDogDaily_Kcal" />
      Diet:
      <input type="text" v-model="newDogDiet" />
      Fitness:
      <input type="text" v-model="newDogFitness" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newDogName: "",
      newDogBreed: "",
      newDogWeight: "",
      newDogMin_of_Activity: "",
      newDogDaily_Kcal: "",
      newDogDiet: "",
      newDogFitness: "",
      newDogImage: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createDog: function() {
      var params = {
        name: this.newDogName,
        breed_id: this.newDogBreed,
        weight: this.newDogWeight,
        min_of_activity: this.newDogMin_of_Activity,
        daily_kcal: this.newDogDaily_Kcal,
        diet_id: this.newDogDiet,
        fitness_id: this.newDogFitness,
        image: this.newDogImage,
      };
      axios
        .post("/api/dogs", params)
        .then(response => {
          console.log("dogs create", response);
          this.$router.push("/dogs");
        })
        .catch(error => {
          console.log("dogs create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
