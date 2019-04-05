<template>
  <div class="columns-wrapper">
    <Column v-for="id in order" :id="id" :key="id"/>

    <button @click="createColumn"> ADD COLUMN </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Column from '@/components/Column.vue';

export default {
  name: 'home',
  components: {
    Column,
  },

  computed: {
    ...mapGetters('columns', [
      'order',
    ]),
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

    padding-top: spacing('default');
    padding-bottom: spacing('default');

    >*{
      white-space: normal;
    }
  }
</style>
