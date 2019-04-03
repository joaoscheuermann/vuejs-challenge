<template>
  <div class="column">
    Col
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  @import '../style/modules/padding.module';
  @import '../style/modules/typography.module';

  .column {
    display: inline-block;
    margin-right: padding('default');
    margin-left: padding('default');

    max-height: 100%;
    width: 320px;
    font-size: font-size('xlarge');
  }
</style>
