<template>
  <div class="columns-wrapper">
    <Column />
    <Column />
    <Column />
    <Column />
    <Column />
    <Column />
    <Column />
    <Column />
    <Column />
    <Column />
  </div>
</template>

<script>
import Column from '@/components/Column.vue';

export default {
  name: 'home',
  components: {
    Column,
  },
};
</script>


<style lang="scss">
  @import '../style/modules/padding.module';
  @import '../style/modules/typography.module';

  .columns-wrapper {
    width: 100%;
    height: 100%;
    white-space: nowrap;
  }
</style>
