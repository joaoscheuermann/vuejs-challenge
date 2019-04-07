<template>
  <div class="card-wrapper">
    <draggable
      class="card"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
      @drag="handleDrag">

      <div class="title"> {{ card.title }} </div>
      <div class="description"> {{ card.description }} </div>
      <div class="id"> {{ card.id }} </div>
    </draggable>
  </div>
</template>

<script>
import draggable from '@/components/draggable.vue';

export default {
  props: {
    id: {
      type: String,
    },
  },

  components: {
    draggable,
  },

  computed: {
    card() {
      return this.$store.getters['cards/card'](this.id);
    },
  },

  methods: {
    handleDragStart() {

    },
    handleDragEnd() {

    },
    handleDrag() {

    },
  },
};
</script>

<style lang="scss">
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .card-wrapper {
    position: relative;
    width: 100%;
    // height: 400px;
  }

  .card {
    position: relative;
    padding: spacing('default');
    margin-bottom: spacing(small);
    width: 100%;

    background: #ffffff;
    border: 1px solid #EDEDED;
    border-radius: 5px;

    > .title {
      @include typography-poppins-semibold(font-size(xsmall));
      margin-bottom: spacing(small);
    }

    > .description {
      @include typography-poppins-regular(font-size(xxxsmall));
      text-align: left;
    }

    >.id {
      margin-top: 10px;
      @include typography-poppins-regular(9px);
      color: #A6A6A6;
      text-align: right;
    }
  }

</style>
