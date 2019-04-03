<template>
  <div :id="$style.app">
    <router-view/>
  </div>
</template>

<script>
export default {

  data() {
    return {

    };
  },

  mounted() {

  },
};
</script>

<style lang="scss" module>
  @import './style/modules/app.module';
  @import './style/modules/padding.module';

  #app {
    height: 100%;
    width: 100%;

    padding-top: padding('default');
    padding-bottom: padding('default');
  }
</style>
