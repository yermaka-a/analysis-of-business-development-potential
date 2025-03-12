<script setup lang="ts">
import ListOfCompanies from '../../components/ListOfCompanies/ListOfCompanies.vue';
import MainInputForm from '../../components/MainInputForm';
import MainRatingTypes from "@components/RatingTypes"
import MainSamplingPrinciple from "@components/SamplingPrinciple"
</script>

<template>
  <main>
    <div class="main-container">
      <MainInputForm />
      <ListOfCompanies />
    </div>
    <div class="config-container">
      <MainRatingTypes />
      <MainSamplingPrinciple />
    </div>
  </main>
</template>


<style lang="scss" scoped>
main {
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
}

.main-container {
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 5%;
  margin-bottom: 20px;
}

.config-container {
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10%;
}
</style>
