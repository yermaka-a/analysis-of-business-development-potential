
<script setup lang="ts">
import MainDashboard from '../../components/MainDashboard/MainDashboard.vue';
import MainInputForm from '../../components/MainInputForm';
import MainRatingTypes from "@components/RatingTypes"
import MainSamplingPrinciple from "@components/SamplingPrinciple"
</script>

<template>
  <main >
    <div class="main-container">
    <MainInputForm/>
    <MainDashboard/>
  </div>
  <div class="config-container">
    <MainRatingTypes/>
    <MainSamplingPrinciple/>
  </div>
  </main>
</template>


<style lang="scss" scoped>
    .main-container{
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10%;
      margin-bottom: 20px;
    }
    .config-container{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 10%;
    }
</style>
