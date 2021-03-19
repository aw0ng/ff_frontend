<template>
  <div class="dogs-show">
    <h2>{{ this.dog.name }}'s Breed Info</h2>
    <p></p>
    <p>Breed: {{ this.breed.name }}</p>
    <p>Weight: {{ this.breed.weight.imperial }} lbs</p>
    <p>Height: {{ this.breed.height.imperial }} inches</p>
    <p>Life Span: {{ this.breed.life_span }}</p>
    <p>Temperament: {{ this.breed.temperament }}</p>
    <p>Group: {{ this.breed.breed_group }}</p>
    <p>Originally bred for: {{ this.breed.bred_for }}</p>
    <p>Is {{ this.dog.name }} within healthy weight range? {{ answer }}</p>
    <!-- Breed info from breed model -->
    <!-- <p>Healthy Weight: {{ this.dog.breed.weight }} lbs</p> -->
    <!-- <p>Diet: {{ diet.first.name }}</p> -->
    <!-- <p>Minimum Daily Activity: {{ this.dog.breed.min_of_activity }} minutes</p> -->
    <!-- <p>Daily Calories: {{ this.dog.breed.daily_kcal }}</p> -->
    <img class="resize" v-bind:src="dog.image" v-bind:alt="dog.name" />
    <p><a class="back-to" href="/dogs">Back to Our Furiends</a></p>
    <button v-on:click="setupMap()">Find A Dog Park</button>
    <p></p>
    <div id="map"></div>
    <p></p>
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
#map {
  width: 100%;
  height: 400px;
}
</style>

<script>
/* global mapboxgl */
/* global MapboxGeocoder */
import axios from "axios";
export default {
  data: function() {
    return {
      dog: { name: "", image: "" },
      breed: { name: "", weigth: "", height: "", life_span: "", temperament: "", bred_for: "" },
      answer: "",
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
          });
      });
    },
    weightAnswer: function() {},
    setupMap: function() {
      mapboxgl.accessToken = "pk.eyJ1IjoiYXcwbmciLCJhIjoiY2ttZTU1YzAwMnBsaTMzb2NuZHBjazlkZCJ9.DroXcFdUavBtQygqu0qPHA";
      var map = new mapboxgl.Map({
        container: "map", // Container ID
        style: "mapbox://styles/mapbox/streets-v11", // Map style to use
        center: [-122.25948, 37.87221], // Starting position [lng, lat]
        zoom: 12, // Starting zoom level
      });
      console.log(map);
      var marker = new mapboxgl.Marker() // initialize a new marker
        .setLngLat([-122.25948, 37.87221]) // Marker [lng, lat] coordinates
        .addTo(map); // Add the marker to the map
      console.log(marker);
      var geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker style
        placeholder: "Search for places in Berkeley", // Placeholder text for the search bar
        bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
        proximity: {
          longitude: -122.25948,
          latitude: 37.87221,
        }, // Coordinates of UC Berkeley',
      });

      // Add the geocoder to the map
      map.addControl(geocoder);
      // After the map style has loaded on the page,
      // add a source layer and default styling for a single point
      map.on("load", function() {
        map.addSource("single-point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: "point",
          source: "single-point",
          type: "circle",
          paint: {
            "circle-radius": 10,
            "circle-color": "#448ee4",
          },
        });

        // Listen for the `result` event from the Geocoder
        // `result` event is triggered when a user makes a selection
        //  Add a marker at the result's coordinates
        geocoder.on("result", function(e) {
          map.getSource("single-point").setData(e.result.geometry);
        });
      });
    },
  },
};
</script>
