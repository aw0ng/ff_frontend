<template>
  <div class="dogs-new">
    <section class="page-section" id="contact">
      <div class="container">
        <!-- Contact Section Heading-->
        <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">New Furiend</h2>
        <!-- Icon Divider-->
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon"><i class="fas fa-paw"></i></div>
          <div class="divider-custom-line"></div>
        </div>
        <!-- Contact Section Form-->
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <form id="contactForm" v-on:submit.prevent="createDog()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <!-- Name -->
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Name"
                    required="required"
                    data-validation-required-message="Please enter your furiend's name."
                    v-model="newDogName"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <!-- Image -->
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Image"
                    required="required"
                    data-validation-required-message="Please enter image url."
                    v-model="newDogImage"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <!-- Breed -->
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Breed"
                    required="required"
                    data-validation-required-message="Please enter your furiend's weight."
                  />
                  <select class="form-control" v-model="newDogBreed">
                    <option v-for="breed in breeds" v-bind:key="breed.id" v-bind:value="breed.id">
                      {{ breed.name }}
                    </option>
                  </select>
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <!-- Weight -->
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Weight"
                    required="required"
                    data-validation-required-message="Please enter your furiend's weight."
                  />
                  <select class="form-control" v-model="newDogWeight">
                    <option disabled value="">Please select one</option>
                    <option>10</option>
                  </select>
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <!-- Fitness -->
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Activity"
                    required="required"
                    data-validation-required-message="Please enter preferred activity."
                  />
                  <select class="form-control" v-model="newDogFitness">
                    <option v-for="fitness in fitnesses" v-bind:key="fitness.id" v-bind:value="fitness.id">
                      {{ fitness.activity }}
                    </option>
                  </select>
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <!-- Activity Minutes -->
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Minutes Per Day"
                    required="required"
                    data-validation-required-message="Please enter daily activity in minutes."
                    v-model="newDogMin_of_Activity"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <!-- Diet -->
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Diet"
                    required="required"
                    data-validation-required-message="Please enter type of food."
                  />
                  <select class="form-control" v-model="newDogDiet">
                    <option v-for="diet in diets" v-bind:key="diet.id" v-bind:value="diet.id">
                      {{ diet.brand }}
                    </option>
                  </select>
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <!-- Daily Kcal -->
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Daily Calories"
                    required="required"
                    data-validation-required-message="Please enter daily calories consumed."
                    v-model="newDogDaily_Kcal"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <br />
              <div id="success"></div>
              <div class="form-group">
                <button class="btn btn-primary btn-xl" id="sendMessageButton" type="submit" value="Create">
                  Add Furiend
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.dogs-new {
  margin-top: 6em;
}
</style>

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
      breeds: [],
      diets: [],
      fitnesses: [],
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/breeds").then(response => {
      console.log("breeds index", response);
      this.breeds = response.data;
    });
    axios.get("/api/diets").then(response => {
      console.log("diets index", response);
      this.diets = response.data;
    });
    axios.get("/api/fitnesses").then(response => {
      console.log("fitnesses index", response);
      this.fitnesses = response.data;
    });
  },
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
