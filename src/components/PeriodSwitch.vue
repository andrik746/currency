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
      class="month-button"
      :disabled="showMonth"
      @click="fetchMonth"
    >
      Month
    </BaseButton>
    <BaseButton
      :disabled="showSixMonths"
      @click="fetchSixMonths"
    >
      6 months
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
    },
    showSixMonths: {
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
    },
    fetchSixMonths() {
      this.$emit('fetchSixMonths')
    }
  }
}
</script>
<style scoped>
  .period-switch{
    margin-top:15px;
  }
  .month-button, .two-weeks-button{
    margin-right: 10px;
  }
</style>