<template>

<div class="form-input">
  <input type="text" :value="value">
  <svgicon :name=icon :color=color ></svgicon>
</div>
  
</template>

<script>
import '@/components/icons'
export default {
  name: 'FormInput',
  props: {
    value: [String, Number],
    icon: String,
    color: {
      type: String,
      default: '#FFF'
    }
  },
  components: {
  },
  computed: {
    getIcon() {
      return `icons/${this.icon}`
    }
  }

}
</script>

<style lang="scss" scoped>

  .form-input {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid rgba(44, 140, 255, .39);
    padding: 1rem;
    color: lightgrey;
    // background-color: orange;
    border-radius: 4px;
    width: 90%;
    height: 5rem;

    input {
      // max-width: 90%;
      border: none;
      outline: none;
      color: inherit;
      background: transparent;
      font-family: "Roboto Condensed", sans-serif;
    }

    
    
  }


</style>
