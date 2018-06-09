<template>
<div class="wrapper">
  <section class="left">
    <div class="icon">
      <i :class="icon"></i>
    </div>
    <div class="header">
      <div class="title">{{title}}</div>
      <small>{{infos}}</small>
    </div>
    
  </section>
  <section class="right txt-right">
    <div class="top"><small>{{top}}</small></div>
    <div class="middle"><small>{{middle}}</small></div>
    <div class="bottom"><small>{{bottom}}</small></div>
  </section>
</div>
  
  
</template>

<script>
export default {
  props: ['icon', 'title', 'infos', 'top', 'middle', 'bottom']

}
</script>

<style lang="scss" scoped>
  @import "../../sass/abstracts/_variables";

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #3d404c;
    padding-bottom: 1rem;
  }

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .icon {
    color: $color-theme;
    font-size: 6rem;
    padding-left: .5rem;
  }

  .header {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    height: 6rem;
    margin-left: 2.6rem;

  }

  .title {
    font-size: 2.5rem;
    color: $color-white;
    font-weight: 500;
  }

  .right {
    padding-right: .5rem;

    
  }

  .bottom {
      color: $color-white;
    }

  

  

</style>
