
<script setup lang="ts">
import MainDashboard from '../../components/MainDashboard/MainDashboard.vue';
import MainInputForm from '../../components/MainInputForm';
</script>

<template>
  <main >
    <div class="main-container">
    <MainInputForm/>
    <MainDashboard/>
  </div>
  </main>
</template>


<style lang="scss" scoped>
    .main-container{
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10%;
    }
</style>
