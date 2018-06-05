<template>
<div>

  <h1 @click="toggleShow">Dashboard</h1>
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
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped>

  .MenuPopover {
    background-color: #ccc;
    max-width: 50%;
    margin: 0 auto;
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
