<template>
  <div>
    <content-header
      :icon=icon
      title="Facturation"
      infos="Page d'acceuil pour la facturation. Pour afficher, créer, modifier, imprimer et supprimer les factures."
      top="Facturation"
      middle="Ajout"
      bottom="Liste"
    ></content-header>
    <h1>TODO: implement invoices</h1>
  </div>

</template>

<script>
import { FACTURATION_ICON } from '@/app_constants'
import ContentHeader from '@/components/layout/ContentHeader'
export default {
  data() {
    return {
      icon: FACTURATION_ICON
    }
  },
  components: {
    ContentHeader
  }

}
</script>

<style>

</style>
