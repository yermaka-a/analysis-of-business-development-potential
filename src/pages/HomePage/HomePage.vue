<script setup lang="ts">
import MainAnalyzedCompaniesList from '@/components/MainAnalyzedCompaniesList';
import ListOfCompanies from '@/components/ListOfCompanies';
import MainInputForm from '@/components/MainInputForm';
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
      <MainAnalyzedCompaniesList class="item3"/>
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
  grid-template-rows: auto auto;
  grid-gap: 10%;
  column-gap: 20px;
  row-gap: 20px;
}
.item3{
  grid-column: span 2;
}
</style>
