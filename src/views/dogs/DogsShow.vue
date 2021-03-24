<template>
  <div class="dogs-show">
    <div class="row">
      <div class="col-sm">
        <div class="item1">
          <h2>{{ dog.name }}'s Recommendation</h2>
          <br />
          <img class="img-fluid" v-bind:src="dog.image" v-bind:alt="dog.name" />
          <br />
          <br />
          <!-- <div v-if="weightDiff > 0"> -->
          <h6>{{ dog.name }} is {{ weightDiff() }} lbs overweight</h6>
          <div v-for="exercise in exercises" v-bind:key="exercise.id">
            <div v-if="exercise.breed_group === breed.breed_group">
              <div v-if="dog.min_of_activity === exercise.min_activity">
                <h6>{{ dog.name }} should eat {{ weightDiff() * 25 }} fewer daily calories</h6>
              </div>
              <div v-if="exercise.min_activity - dog.min_of_activity > 0">
                <h6>
                  {{ dog.name }} needs {{ exercise.min_activity - dog.min_of_activity }} more minutes of activity per
                  day
                </h6>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <div class="col-sm">
        <div class="item2">
          <br />
          <br />
          <h5>{{ this.dog.name }}'s Breed</h5>
          <br />
          <h6>Name: {{ breed.name }}</h6>
          <h6>Weight: {{ breed.weight.imperial }} lbs</h6>
          <h6>Height: {{ breed.height.imperial }} inches</h6>
          <h6>Life Span: {{ breed.life_span }}</h6>
          <h6>Temperament: {{ breed.temperament }}</h6>
          <h6>Group: {{ breed.breed_group }}</h6>
          <h6>Originally bred for: {{ breed.bred_for }}</h6>
          <br />
          <br />
          <button class="button" v-on:click="showDogParks()">Find a Dog Park</button>
        </div>
      </div>
      <div class="col-sm">
        <div class="item3">
          <br />
          <br />
          <br />
          <br />
          <img
            class="img-fluid"
            src="https://www.petmd.com/sites/default/files/feeding-chart.jpg"
            v-bind:alt="dog.name"
          />
          <br />
          <br />
          <br />
          <button class="button" v-on:click="backToDogs()">Back to Our Furiends</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dogs-show {
  margin-top: 8em;
  margin-bottom: 2em;
}
.button {
  padding: 10px;
  background-color: #1abc9c;
  border-radius: 4px;
  border: none;
  color: #ffffff;
  text-transform: uppercase;
  font-family: "Montserrat";
  font-weight: 700;
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
      weight_diff: "",
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
      if (!this.breed.weight) {
        return 0;
      }
      weight_diff = [];
      var goal_weight_range = this.breed.weight.imperial.split(" ");
      var high_weight = parseInt(goal_weight_range[2]);
      var low_weight = parseInt(goal_weight_range[0]);
      var weight_diff = this.dog.weight - high_weight;
      console.log(low_weight, weight_diff);
      console.log(goal_weight_range);
      return weight_diff;
    },
    showDogParks: function() {
      this.$router.push("/dogparks");
    },
    backToDogs: function() {
      this.$router.push("/dogs");
    },
  },
};
</script>
