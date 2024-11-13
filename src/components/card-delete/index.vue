<script lang="ts" setup>
  
    import { defineProps } from 'vue';

    defineProps({
    card: {
      type: Object,
      required: true,
    },
  });
</script>
  
  <template>
    <div
      :key="card.id"
      class="card"
    >
      <h3>Title: {{ card?.title }}</h3>
      <small>Status: {{ card?.status }}</small>
      <p>Time: {{ card?.timestamp }}</p>
      <strong>ID: {{ card?.id }}</strong>
    </div>
  </template>

<style scoped src="./style.scss"></style>