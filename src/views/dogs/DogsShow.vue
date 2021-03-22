<template>
  <div class="dogs-show">
    <h2>{{ dog.name }}'s Recommendation</h2>
    <img class="resize" v-bind:src="dog.image" v-bind:alt="dog.name" />
    <br />
    <p>{{ dog.name }} is {{ weightDiff() }} lbs overweight</p>
    <p>{{ dog.name }} should eat {{ weightDiff() * 25 }} fewer calories per day</p>
    <div class="dogs-show" v-for="exercise in exercises" v-bind:key="exercise.id">
      <div v-if="exercise.breed_group === breed.breed_group">
        Bobby needs {{ exercise.min_activity - dog.min_of_activity }} more minutes of activity per day.
      </div>
    </div>
    <p></p>
    <img class="chart" src="https://www.petmd.com/sites/default/files/feeding-chart.jpg" v-bind:alt="dog.name" />
    <!-- <button v-on:click="">Find A Dog Park</button> -->
    <a href="/dogparks">Find a Dog Park</a>
    <p></p>
    <h2>{{ dog.name }}'s Breed Info</h2>
    <p></p>
    <p>Breed: {{ breed.name }}</p>
    <p>Weight: {{ breed.weight.imperial }} lbs</p>
    <p>Weight: {{ goal_weight_range }} lbs</p>
    <p>Height: {{ breed.height.imperial }} inches</p>
    <p>Life Span: {{ breed.life_span }}</p>
    <p>Temperament: {{ breed.temperament }}</p>
    <p>Group: {{ breed.breed_group }}</p>
    <p>Originally bred for: {{ breed.bred_for }}</p>
    <p><a class="back-to" href="/dogs">Back to Our Furiends</a></p>
  </div>
</template>

<style scoped>
.dogs-show {
  margin-top: 8em;
  margin-bottom: 2em;
}
img.resize {
  max-width: 30%;
  max-height: 30%;
}
img.chart {
  max-width: 100%;
  max-height: 100%;
}
</style>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      dog: { name: "", image: "" },
      breed: { name: "", weight: "", height: "", life_span: "", temperament: "", bred_for: "", imperial: "" },
      answer: "No",
      // weight_diff: "",
      kcal_diff: "600",
      exercises: [],
      breed_group: "",
      goal_weight_range: "",
      goal_weight: "",
      high_weight: "",
      low_weight: "",
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
        axios
          .get("https://api.thedogapi.com/v1/breeds/" + this.dog.breed_id, {
            headers: {
              Authorization: "Bearer" + "31ae3f3a-fec0-45c1-951b-4af07336038e",
            },
          })
          .then(response => {
            console.log("breeds show", response);
            this.breed = response.data;
            axios.get("/api/exercises").then(response => {
              console.table(response.data);
              this.exercises = response.data;
            });
          });
      });
    },
    weightDiff: function() {
      weight_diff = [];
      var goal_weight_range = this.breed.weight.imperial.split(" ");
      var high_weight = parseInt(goal_weight_range[2]);
      var low_weight = parseInt(goal_weight_range[0]);
      var weight_diff = this.dog.weight - high_weight;
      console.log(low_weight, weight_diff);
      console.log(goal_weight_range);
      return weight_diff;
    },
  },
};
</script>
