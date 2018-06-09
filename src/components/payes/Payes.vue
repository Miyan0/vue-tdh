<template>
  <div>
    <content-header
      :icon=icon
      title="Payes"
      infos="Page d'acceuil pour les payes. Pour afficher, créer, modifier, imprimer et supprimer les payes."
      top="Payes"
      middle="Ajout"
      bottom="Liste"
    ></content-header>
    <h1>TODO: implement payes</h1>
  </div>
</template>

<script>

import ContentHeader from '@/components/layout/ContentHeader'
import {PAYES_ICON} from '@/app_constants'

export default {
  data() {
    return {
      icon: PAYES_ICON
    }
  },
  components: {
    ContentHeader
  }

}
</script>

<style>

</style>
