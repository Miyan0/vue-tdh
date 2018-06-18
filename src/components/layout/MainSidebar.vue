<template>
<div class="main-sidebar">
  <el-tooltip class="item" effect="dark" content="Navigation" placement="right" v-if="isCollapse">
      <el-button type="text" @click="isCollapse=!isCollapse" v-if="isCollapse">
        <svgicon name="layout" color="white" ></svgicon>
    </el-button>
  </el-tooltip>
  
  <div class="menu-expanded"  @click="isCollapse=!isCollapse" v-else>
    <el-button type="text"  >
      <svgicon name="layout2" color="white" ></svgicon>
    </el-button>
    <span>Navigation</span>
  </div>
 
  <el-menu 
    :default-active="$route.path"
    class="main-sidebar-menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#1e222b"
    :router="true"
    text-color="#fff"
    active-text-color="#2c8cff"
  >
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>
    <el-menu-item index="/rapports">
      <i class="el-icon-document"></i>
      <span slot="title">Rapports</span>
    </el-menu-item>
    <el-menu-item index="/rues">
      <i class="el-icon-setting"></i>
      <span slot="title">Rues</span>
    </el-menu-item>
  </el-menu>
  <footer>
    <span class="first">t</span>
    <span class="middle">d</span>
    <span class="last">h</span>
  </footer>
</div>

</template>

<script>
//  <el-button type="text" icon="el-icon-edit" @click="isCollapse=!isCollapse"></el-button>

/**
 * 
 * <div class="menu-expanded"  @click="isCollapse=!isCollapse">
    <el-button type="text"  >
      <svgicon name="layout2" color="white" ></svgicon>
    </el-button>
    <span>Navigation</span>
  </div>
 */
export default {
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../sass/abstracts/_variables";

  .menu-expanded {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    align-self: flex-start;
    color: white;

    span {
      margin-left: -0.7rem;
      padding-top: .2rem;
    }
  }

  .main-sidebar-menu{
    
    border: none;
    flex-grow: 2;

    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
  .el-button {
    padding: 2rem;
    font-size: 2rem;
  }

  .main-sidebar {
    background-color: #1e222b;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  footer {
    padding: 1rem;
    font-size: 2rem;
    color: white;
    font-family: "Roboto Condensed", sans-serif;
    
    .middle {
      color: #2c8cff;
    }
  }

  
</style>



