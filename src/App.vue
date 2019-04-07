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
  @import './style/modules/spacing.module';

  #app {
    min-height: 100%;
    width: 100%;;
    // overflow-y: scroll;
  }

  html, body {
    background: #FAFAFA;
  }
</style>
