<template>
  <div class="card-wrapper">
    <DraggableElement 
      class="card"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
      @drag="handleDrag">

      Card
    </DraggableElement>
  </div>
</template>

<script>
import DraggableElement from '@/components/DraggableElement.vue';

export default {
  props: {
    id: {
      type: String,
    },
  },

  components: {
    DraggableElement,
  },

  methods: {
    handleDragStart() {
      console.log('batata')
    },
    handleDragEnd() {
      console.log('batata')
    },
    handleDrag() {
      console.log('asdadas')
    },
  },
};
</script>

<style lang="scss">
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .card-wrapper {
    position: relative;
    background: red;
  }

  .card {
    position: relative;
    padding: spacing('default');
    width: 100%;


    font-size: font-size('default');
    background: lightgrey;
  }

</style>
