<template>
  <div>
    <h2>{{ dog.name }}</h2>
    <h4>{{ dog.recommendations }}</h4>
    <a href="/dogs">Back to Our Furiends</a>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      dog: {},
    };
  },
  created: function() {
    this.showDog();
  },
  methods: {
    showDog: function() {
      axios.get("/api/dogs/" + this.$route.params.id).then(response => {
        console.log(response.data);
        this.recipe = response.data;
      });
    },
  },
};
</script>
