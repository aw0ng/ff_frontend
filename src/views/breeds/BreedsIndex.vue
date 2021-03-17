<template>
  <div class="breeds-index">
    <section class="page-section" id="contact">
      <div class="container">
        <!-- Contact Section Heading-->
        <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Breeds</h2>
        <!-- Icon Divider-->
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon"><i class="fas fa-paw"></i></div>
          <div class="divider-custom-line"></div>
        </div>
        <div class="info" v-for="breed in breeds" v-bind:key="breed.id">
          <h2>{{ breed.name }}</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.breeds-index {
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
      breeds: [],
    };
  },
  created: function() {
    axios.get("/api/breeds").then(response => {
      console.log("breeds index", response);
      this.breeds = response.data;
    });
  },
  methods: {},
};
</script>
