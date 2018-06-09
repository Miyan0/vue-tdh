<template>
<div>
  <content-header
    :icon=icon
    title="Dashboard"
    infos="Page d'acceuil. Affiche les statistiques et autres informations générales."
    top="Statisiques"
    middle="Payes"
    bottom="Autres"
  ></content-header>
  <h1 @click="toggleShow">Trying VueJs transitions!</h1>
  <transition name="menu-popover">
    <ul class="MenuPopover" v-if="show">
      <li>Payments</li>
      <li>Subscriptions</li>
      <li>Connect</li>
    </ul>
  </transition>
</div>
</template>

<script>
import ContentHeader from '@/components/layout/ContentHeader'
import { DASHBOARD_ICON } from '@/app_constants'
export default {
  components: {
    ContentHeader
  },
  data() {
    return {
      show: false,
      icon: DASHBOARD_ICON
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped lang='scss'>

  .MenuPopover {
    background-color: black;
    max-width: 50%;
    margin: 0 auto;
    border: 1px solid #444;

    li {
      list-style: none;
      padding: 1rem;
    }
  }
  .menu-popover-enter,
  .menu-popover-leave-to {
    transform: rotateY(50deg);
    opacity: 0;
  }
  .menu-popover-enter-to,
  .menu-popover-leave {
    opacity: 1;
    transform: rotateY(0deg);
  }
  .menu-popover-enter-active,
  .menu-popover-leave-active {
    transition: opacity, transform 200ms ease-out;
  }
  
</style>
