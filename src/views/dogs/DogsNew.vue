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
              <div class="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your Furiend's Name" class="form-control" v-model="newDogName" />
              </div>
              <!-- Image -->
              <div class="form-group">
                <label>Image</label>
                <input
                  type="file"
                  placeholder="Photo of Your Furiend"
                  class="form-control"
                  v-on:change="setFile($event)"
                  ref="fileInput"
                />
              </div>
              <!-- Breed -->
              <div class="form-group">
                <label>Breed</label>
                <select class="form-control" v-model="newDogBreed">
                  <option v-for="breed in breeds" v-bind:key="breed.id" v-bind:value="breed.id">
                    {{ breed.name }}
                  </option>
                </select>
              </div>
              <!-- Breed from model -->
              <!-- <div class="form-group">
                <label>Breed</label>
                <select class="form-control" v-model="newDogBreed">
                  <option v-for="breed in breeds" v-bind:key="breed.id" v-bind:value="breed.id">
                    {{ breed.name }}
                  </option>
                </select>
              </div> -->
              <!-- Weight -->
              <div class="form-group">
                <label>Weight</label>
                <input
                  type="text"
                  placeholder="Your Furiend's Weight in Pounds"
                  class="form-control"
                  v-model="newDogWeight"
                />
              </div>
              <!-- Diet -->
              <div class="form-group">
                <label>Diet</label>
                <select class="form-control" v-model="newDogDiet">
                  <option v-for="diet in diets" v-bind:key="diet.id" v-bind:value="diet.id">
                    {{ diet.brand }}
                  </option>
                </select>
              </div>
              <!-- Daily Kcal -->
              <div class="form-group">
                <label>Daily Calories</label>
                <input
                  type="text"
                  placeholder="Your Furiend's Daily Calorie Intake"
                  class="form-control"
                  v-model="newDogDaily_Kcal"
                />
              </div>
              <!-- Fitness -->
              <div class="form-group">
                <label>Activity</label>
                <select class="form-control" v-model="newDogFitness">
                  <option v-for="fitness in fitnesses" v-bind:key="fitness.id" v-bind:value="fitness.id">
                    {{ fitness.activity }}
                  </option>
                </select>
              </div>
              <!-- Activity Minutes -->
              <div class="form-group">
                <label>Daily Minutes of Activity</label>
                <select class="form-control" v-model="newDogMin_of_Activity">
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                  <option>60</option>
                  <option>75</option>
                </select>
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
// import { response } from "express";

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
      newDog: null,
    };
  },
  created: function() {
    // axios.get("/api/breeds").then(response => {
    //   console.log("breeds index", response);
    //   this.breeds = response.data;
    // });
    axios.get("/api/diets").then(response => {
      console.log("diets index", response);
      this.diets = response.data;
    });
    axios.get("/api/fitnesses").then(response => {
      console.log("fitnesses index", response);
      this.fitnesses = response.data;
    });
    axios
      .get("https://api.thedogapi.com/v1/breeds", {
        headers: {
          Authorization: "Bearer" + "31ae3f3a-fec0-45c1-951b-4af07336038e",
        },
      })
      .then(response => {
        console.log("breeds index", response);
        this.breeds = response.data;
      });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.newDogImage = event.target.files[0];
      }
    },
    createDog: function() {
      var formData = new FormData();
      formData.append("name", this.newDogName);
      formData.append("breed_id", this.newDogBreed);
      formData.append("weight", this.newDogWeight);
      formData.append("min_of_activity", this.newDogMin_of_Activity);
      formData.append("daily_kcal", this.newDogDaily_Kcal);
      formData.append("diet_id", this.newDogDiet);
      formData.append("fitness_id", this.newDogFitness);
      formData.append("image", this.newDogImage);
      // var params = {
      //   name: this.newDogName,
      //   breed_id: this.newDogBreed,
      //   weight: this.newDogWeight,
      //   min_of_activity: this.newDogMin_of_Activity,
      //   daily_kcal: this.newDogDaily_Kcal,
      //   diet_id: this.newDogDiet,
      //   fitness_id: this.newDogFitness,
      //   image: this.newDogImage,
      // };
      axios
        .post("/api/dogs", formData)
        .then(response => {
          this.newDog = response.data;
          console.log(this.newDog);
          console.log("dogs create", response);
          // this.$router.push("/dogs/" + this.dog.id);
        })
        .then(() => {
          this.showDog();
        })
        .catch(error => {
          console.log("dogs create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    showDog: function() {
      console.log("show dog");
      console.log(this.newDog.id);
      this.$router.push("/dogs/" + this.newDog.id);
    },
  },
};
</script>
