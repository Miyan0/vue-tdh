<template>

    <li @click="selectRapport(rapport)">ID: {{rapport.id}} - Name: {{rapport.name}}</li>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RapportListItem',
  props: ['rapport'],
  methods: mapActions(['selectRapport'])
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
