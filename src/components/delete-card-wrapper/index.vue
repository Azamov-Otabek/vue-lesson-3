<script setup lang="ts">
  
  import { DeleteTasks } from '../../constans';
  import CardDelete from '../card-delete/index.vue'



</script>

<template>
  <div class="delete">
    <div class="container">
        <div class="delete-container">
          <h1>Deleted Tasks</h1>
          <div class="deletes-wrapper">
              <CardDelete v-for="task in DeleteTasks" :key="task.id" :card="task" /> 
          </div>
        </div>
    </div>
  </div>
</template>

<style src="./style.scss" scoped></style>
