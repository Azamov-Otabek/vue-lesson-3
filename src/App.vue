<script setup lang="ts">
import FormTasks from "./components/form-add-tasks/index.vue";
import TasksWrapper from './components/tasks-wrapper/index.vue'
import DeleteWrapper from './components/delete-card-wrapper/index.vue'

</script>

<template>
  <main>
    <FormTasks />
    <TasksWrapper />
    <DeleteWrapper/>
  </main>
</template>

<style lang="scss" scoped></style>
