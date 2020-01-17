<template>
  <div class="period-switch">
    <BaseButton
      class="two-weeks-button"
      :disabled="showTwoWeeks"
      @click="fetchTwoWeeks"
    >
      2 weeks
    </BaseButton>
    <BaseButton
      :disabled="showMonth"
      @click="fetchMonth"
    >
      Month
    </BaseButton>
  </div>
</template>
<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: "PeriodSwitch",
  components: {
    BaseButton
  },
  props: {
    showTwoWeeks: {
      type: Boolean,
      default: true
    },
    showMonth: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    fetchTwoWeeks(){
      this.$emit('fetchTwoWeeks')
    },
    fetchMonth() {
      this.$emit('fetchMonth')
    }
  }
}
</script>
<style scoped>
  .period-switch{
    margin-top:15px;
  }
  .two-weeks-button{
    margin-right: 10px;
  }
</style>