<script setup lang="ts">
import type { IProps } from './types';

const { disabled, onClick, classes } = defineProps<IProps>()
</script>

<template>
  <button @click="onClick" type="button" :class="classes" :disabled=disabled><slot/></button>
</template>

<style lang="scss" scoped>
button:hover {
  background-color: #A50034;
  /* Красный цвет при наведении */
}

button {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button:disabled {
  background-color: #4188c5; /* Цвет для отключенной кнопки */
  cursor: not-allowed; /* Изменение курсора для отключенной кнопки */
}
button {
  display: inline;
  background-color: #0056A0;
  /* Синий цвет */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
</style>
