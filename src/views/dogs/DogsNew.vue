<template>
  <div class="dogs-new">
    <section class="page-section" id="contact">
      <div class="container">
        <!-- Contact Section Heading-->
        <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">New Furiend</h2>
        <!-- Icon Divider-->
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
          <div class="divider-custom-line"></div>
        </div>
        <!-- Contact Section Form-->
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <form id="contactForm" v-on:submit.prevent="createDog()">
              <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Name</label>
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Name"
                    required="required"
                    data-validation-required-message="Please enter your name."
                    v-model="newDogName"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Image</label>
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
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Breed</label>
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Breed"
                    required="required"
                    data-validation-required-message="Please enter breed type."
                    v-model="newDogBreed"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Weight</label>
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Weight"
                    required="required"
                    data-validation-required-message="Please enter your furiend's weight."
                    v-model="newDogWeight"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Daily Activity</label>
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Daily Activity (minutes)"
                    required="required"
                    data-validation-required-message="Please enter daily activity in minutes."
                    v-model="newDogMin_of_Activity"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Daily Calories</label>
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Daily Calories (minutes)"
                    required="required"
                    data-validation-required-message="Please enter daily calories consumed."
                    v-model="newDogDaily_Kcal"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Diet</label>
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Diet"
                    required="required"
                    data-validation-required-message="Please enter type of food."
                    v-model="newDogDiet"
                  />
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Fitness</label>
                  <input
                    class="form-control"
                    id="name"
                    type="text"
                    placeholder="Fitness"
                    required="required"
                    data-validation-required-message="Please enter preferred activity."
                    v-model="newDogFitness"
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
  margin-top: 10em;
  margin-bottom: 6em;
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
