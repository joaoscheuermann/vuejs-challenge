<template>
  <div class="card">
    CARD
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .card {
    padding: spacing('default');
    font-size: font-size('default');

    background: lightgrey;
  }

</style>
