<template>
  <div class="dogs-index">
    <section class="page-section" id="contact">
      <div class="container">
        <!-- Contact Section Heading-->
        <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Our Furiends</h2>
        <!-- Icon Divider-->
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon"><i class="fas fa-paw"></i></div>
          <div class="divider-custom-line"></div>
        </div>
        <div class="info" v-for="dog in dogs" v-bind:key="dog.id">
          <h2>{{ dog.name }}</h2>
          <img class="img" v-bind:src="dog.image" v-bind:alt="dog.name" />
          <p>
            <a v-bind:href="`/dogs/${dog.id}`">{{ dog.name }}'s Recommendation</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.dogs-index {
  margin-top: 10rem;
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
