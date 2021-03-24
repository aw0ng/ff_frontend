<template>
  <div class="dogs-index">
    <!-- Portfolio Section-->
    <section class="page-section portfolio" id="portfolio">
      <div class="container">
        <!-- Portfolio Section Heading-->
        <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">OUR FURIENDS</h2>
        <!-- Icon Divider-->
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon"><i class="fas fa-paw"></i></div>
          <div class="divider-custom-line"></div>
        </div>
        <!-- Portfolio Grid Items-->
        <div class="row justify-content-center">
          <!-- Portfolio Item 1-->
          <div class="col-md-6 col-lg-4 mb-5" v-for="dog in dogs" v-bind:key="dog.id">
            <div
              class="portfolio-item mx-auto"
              data-toggle="modal"
              data-target="#exampleModal"
              v-on:click="setCurrentDog(dog)"
            >
              <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                <div class="portfolio-item-caption-content text-center text-white">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid img-cover" v-bind:src="dog.image" v-bind:alt="dog.name" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Portfolio Modals-->
    <!-- Portfolio Modal 1-->
    <div
      class="portfolio-modal modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      v-for="dog in dogs"
      v-bind:key="dog.id"
    >
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true"><i class="fas fa-times"></i></span>
          </button>
          <div class="modal-body text-center">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <!-- Portfolio Modal - Title-->
                  <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0" id="exampleModal">
                    {{ currentDog.name }}
                  </h2>
                  <!-- Icon Divider-->
                  <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-paw"></i></div>
                    <div class="divider-custom-line"></div>
                  </div>
                  <!-- Portfolio Modal - Image-->
                  <img class="img-fluid img-cover" v-bind:src="currentDog.image" v-bind:alt="currentDog.name" />
                  <br />
                  <br />
                  <!-- Portfolio Modal - Text-->
                  <h5>
                    {{ currentDog.name }} is {{ currentDog.weight }} lbs and exercises
                    {{ currentDog.min_of_activity }} minutes a day
                  </h5>
                  <br />
                  <button class="btn btn-primary" data-dismiss="modal" v-on:click="showRecommendation()">
                    <i class="fas fa-times fa-fw"></i>
                    Recommendation
                  </button>
                  <br />
                  <br />
                  <button class="btn btn-primary" data-dismiss="modal">
                    <i class="fas fa-times fa-fw"></i>
                    Close Window
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dogs-index {
  margin-top: 6rem;
  /* width: 95%; */
  text-align: center;
}
.img-cover {
  height: 300px;
  width: 100%;
  object-fit: cover;
}
/* .img {
  display: block;
  margin: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  margin-bottom: 1rem;
}
.info {
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
} */
.link {
  color: #1abc9c;
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
    setCurrentDog: function(dog) {
      this.currentDog = dog;
      console.log("dogs name", dog.name);
    },
    showRecommendation: function() {
      this.$router.push("/dogs/" + this.currentDog.id);
    },
  },
};
</script>
