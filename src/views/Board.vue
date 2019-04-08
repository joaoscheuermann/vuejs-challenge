<template>
  <div class="columns-wrapper">
    <Column v-for="id in order" :id="id" :key="id"/>

    <div class="button-wrapper">
      <Button @click.native="addColumn"> ADICIONAR COLUNA <i class="material-icons"> add </i> </Button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Column from '@/components/Column.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'home',
  components: {
    Column,
    Button,
  },

  computed: {
    ...mapGetters('columns', [
      'order'
    ]),

    columns() {

    }
  },

  methods: {
    ...mapActions('columns', [
      'addColumn'
    ])
  },

  mounted() {
    this.addColumn()
  },
};
</script>


<style lang="scss">
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .columns-wrapper {
    position: relative;
    padding-top: spacing(small);
    padding-bottom: spacing(small);

    min-height: 100%;
    // min-width: 100%;

    white-space: nowrap;

    >*{
      white-space: normal;
    }

    >.button-wrapper {
      display: inline-block;
      margin-left: spacing(small);
    }
  }
</style>
