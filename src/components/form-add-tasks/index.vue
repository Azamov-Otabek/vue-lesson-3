<script setup lang="ts">
import { ref } from "vue";
import { toDos } from "../../constans";
const title = ref("");

// Yangi Task qo'shadi
function handelSubmit() {
  if (title.value.length > 0) {
    const payload = {
      title: title.value,
      done: false,
      timestamp:
        new Date().getDate() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getFullYear() +
        " " +
        new Date().getHours() +
        ":" +
        new Date().getMinutes(),
      id: Math.floor(Math.random() * 100) + toDos[0].items?.length + 1,
      status: "new",
    };
    toDos[0]?.items?.push(payload);
    title.value = "";
  } else {
    alert("Title cannot be empty");
  }
}
</script>

<template>
  <section class="form">
    <div class="container">
      <form class="form-wrapper">
        <label for="title">
          <input name="title" v-model="title" placeholder="Enter your new tasks" />
        </label>
        <button @click.prevent="handelSubmit">Create</button>
      </form>
    </div>
  </section>
</template>

<style scoped src="./style.scss"></style>
