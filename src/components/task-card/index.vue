<script setup lang="ts">
import { DragStart, sortDrop, handleDelete, handleDone, dragOver } from "../../functions/drag-drop";
import { defineProps } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  parentIndex: {
    type: Number,
    required: true,
  },
  parentID: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    class="card"
    :data-index="index"
    :key="index"
    :id="card.id"
    draggable="true"
    @dragover.prevent="dragOver"
    @dragstart="(e) => DragStart(e, card.id)"
    @drop="(event) => sortDrop(event, parentID)"
  >
    <h3>Title: {{ card?.title }}</h3>
    <small>Status: {{ card?.status }}</small>
    <p>Time: {{ card?.timestamp }}</p>
    <strong>ID: {{ card?.id }}</strong>

    <div class="btns">
      <button @click="handleDelete(props.card.id, props.parentIndex)">Delete</button>
      <button @click="handleDone(props.card, props.parentIndex)">Task Done</button>
    </div>
  </div>
</template>

<style scoped src="./style.scss"></style>
