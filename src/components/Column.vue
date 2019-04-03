<template>
  <div class="column">
    <div class="header">
      <h1 class="title"> LOREM IPSUN </h1>
    </div>
    <div class="body">
      <Card />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  components: {
    Card,
  },
};
</script>

<style lang="scss">
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .column {
    display: inline-block;
    margin-right: spacing('default');
    width: calc(100% - #{spacing('default') * 2} + 10px);
    max-width: 320px;
    max-height: 100%;
    font-size: font-size('xlarge');
    overflow-y: auto;

    >.header {
      padding: spacing('default');
      margin-bottom: spacing('xsmall');

      >.title {
        font-size: font-size('default');
        white-space: normal;
      }
    }

  }
</style>
