<template>
  <div>
    <AddQuestion></AddQuestion>
    <MyQuestion></MyQuestion>
  </div>
</template>

<script>
import AddQuestion from '@/components/AddQuestion.vue'
import MyQuestion from '@/components/MyQuestion.vue'
import axios from 'axios'
export default {
    components: {
      AddQuestion,
      MyQuestion
    },
}
</script>

<style>

</style>
