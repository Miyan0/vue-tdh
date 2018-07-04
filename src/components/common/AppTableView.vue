<template>
  <div class="table-container">
    <p>Pas generique !!!</p>
    <table class="table">
      <thead>
        <tr >
          <th v-for="title in titles" :key="title">{{title}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="object in data" :key="object.id">
          <td>{{object.procedure_type | procedureType}}</td>
          <td>{{object.no_lot}}</td>
          <td>{{object.no_cause | noCause}}</td>
          <td>{{object | addressOneLine}}</td>
          <td>{{object.demarche_date | dateSplit}}</td>
          <td>{{object.secteur }}</td>
          
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {

  // titles -> column titles
  // data -> array of objects
  // keys -> key of object
  // for example if data contains rapports,
  // titles ~ ['No Lot', 'No Cause'...]
  // data -> allRapports
  // keys ~ ['no_lot', 'no_cause'...] -- unused for now
  props: ['titles', 'data'],
 
}
</script>

<style lang="scss" scoped>

</style>

