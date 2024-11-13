<script setup lang="ts">
import { toDos } from "../../constans";
import TaskCard from "../task-card/index.vue";
import { dragOver, drop } from "../../functions/drag-drop";
</script>

<template>
  <section id="tasks">
    <div class="container">
      <div class="tasks-wrapper">
        <div
          v-for="(e, i) in toDos"
          @dragover.prevent="dragOver"
          @drop="(event) => drop(event, e?.id)"
          class="desktop"
          :key="e.id"
          :id="e.id"
        >
          <h1>{{ e.title }}</h1>
          <TaskCard
            v-for="(card, index) in e.items"
            :key="card.id"
            :card="card"
            :index="index"
            :parentIndex="i"
            :parentID="e.id"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped src="./style.scss"></style>
