<template>

    <li @click="onItemClick">ID: {{rapport.id}} - Name: {{rapport.name}}</li>

</template>

<script>
export default {
  name: 'RapportListItem',
  props: ['rapport'],
  methods: {
    onItemClick() {
      this.$emit('rapportSelect', this.rapport)
    }
  }
}
</script>

<style scoped>
  li {
    cursor: pointer;
    padding: 10px;
    list-style: none;
    border: 1px solid #ddd;
  }
  li:not(:last-child) {
    margin-bottom: 10px;
  }
  li:hover {
    background-color: lightgoldenrodyellow;
  }
</style>
