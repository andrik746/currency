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
  border-radius: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  padding: 0 15px;
  font-size: 13px;
  display: inline-block;
  transition: background-color 0.2s ease-out, border-color 0.2s ease-in-out;
  background-color: #fff;
  border: 1px solid #61b5ff;
  color: #000;
  box-sizing: border-box
}
.button:hover{
  background-color: #61b5ff85;
}
.button:active{
  opacity: .8;
}
.button:focus{
  box-shadow: #eee;
}
.button:disabled{
  background-color: #61b5ff85;
}
.button:disabled:hover{
  background-color: #61b5ff85;
}
</style>
