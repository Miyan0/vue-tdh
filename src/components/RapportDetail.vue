<template>
    <div class="rapport-detail">
        <div v-if="rapport">
            <p>
                <label for="rapport_id">ID:</label>
                <input type="text" placeholder="id" id="rapport_id" name="rapport_id" v-model="rapport.id">
            </p>
            <p>
                <label for="rapport_name">Name:</label>
                <input type="text" placeholder="name" id="rapport_name" name="rapport_name" v-model="rapport.name">
            </p>
            
            
        </div>
        <div v-else>
            <button @click="onAddRapport">Ajouter Nouveau Rapport</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RapportDetail',
  props: ['rapport'],
  methods: {
    onAddRapport() {
      this.$emit('addNewRapport')
    }
  }
}
</script>

<style scoped>
    .rapport-detail {
        min-width: 70%;
        padding-left: 20px;
    }
</style>
