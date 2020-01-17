<template>
  <button class="button" v-on="$listeners" :disabled="disabled">
    <span class="btn-lable">
      <slot/>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="css" scoped>
.button {
  position: relative;
  vertical-align: middle;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  font-size: 16px;
  border: 0 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  box-sizing: border-box !important;
  padding: 0 15px;
  font-size: 13px;
  display: inline-block;
  transition: background-color 0.2s ease-out, border-color 0.2s ease-in-out;
  background-color: blue;
  border: 1px solid blue;
  color: #fff;
}
.button:hover{
  background-color: darkblue;
  border: 1px solid darkblue;
}
.button:focus{
  box-shadow: #eee;
}
</style>
