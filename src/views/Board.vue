<template>
  <div class="columns-wrapper">
    <Column v-for="column in columns" :column="column" :key="column.id"/>

    <button @click="createColumn"> ADD COLUMN </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Column from '@/components/Column.vue';

export default {
  name: 'home',
  components: {
    Column,
  },

  computed: {
    columns() {
      return this.$store.state.columns.instances;
    },
  },

  methods: {
    ...mapActions('columns', [
      'createColumn',
    ]),
  },

  mounted() {

  },
};
</script>


<style lang="scss">
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .columns-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    overflow-x: scroll;

    padding-left: spacing('default');
  }
</style>
