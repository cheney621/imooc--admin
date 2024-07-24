<template>
  <div class="app-wrapper">
    <!-- 左侧menu -->
    <Sidebar class="sidebar-container" :style="{ backgroundColor: variables.menuBg }" />
    <!-- 右侧区域 -->
    <div class="main-container">
      <!-- 加div做吸顶效果 -->
      <div class="fixed-header">
        <Navbar />
      </div>
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppMain from './components/AppMain'
import variables from '@/styles/variables.module.scss'
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
}
</style>
