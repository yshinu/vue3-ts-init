<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <h1>当前环境：{{ import.meta.env.MODE }}</h1>
  <RouterView />
</template>

<style lang="scss"></style>
