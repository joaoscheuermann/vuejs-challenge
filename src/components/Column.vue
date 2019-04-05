<template>
  <div class="column-wrapper" :class="{ dragging: this.dragging }">
    <DraggableElement
      class="column"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
      @drag="handleDrag">

      <div class="header">
        <h1 class="title"> {{ column.title }} </h1>
        <p class="description" > {{ column.id }} </p>
      </div>

      <div class="body">
        <Card />
      </div>

    </DraggableElement>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DraggableElement from '@/components/DraggableElement.vue';
import Card from '@/components/Card.vue';

export default {
  components: {
    DraggableElement,
    Card,
  },

  props: {
    id: {
      type: String,
      default: null,
    },
  },

  computed: {
    column() {
      return this.$store.getters['columns/column'](this.id);
    },
  },

  data() {
    return {
      dragging: false
    };
  },

  methods: {
    ...mapActions('columns', [
      'switchColumnOrder'
    ]),

    // Event handling
    handleDragStart(e) {
      // console.log(e)
      this.dragging = true;
    },
    handleDragEnd(e) {
      // console.log(e)
      this.dragging = false;
    },
    handleDrag(e) {

      this.$root.$emit('columndrag', { id: this.column.id, event: e, })
    },

    handleColumDrag (e) {
      if(e.id === this.column.id) return

      const { x, top, width } = this.$el.getBoundingClientRect();
      const { lastMousePositionX, currentMousePositionX } = e.event;

      this.$el.style = null;

      function intersection (x, area) {
        return x > area.x && x < (area.x + area.width)
      };
      
      // Check for intersections in X
      if (intersection(currentMousePositionX, { x, width })) {
        const direction = currentMousePositionX - lastMousePositionX >= 0 ? 'right' : 'left';
        const deltaX = currentMousePositionX - x;

        if (direction === 'left' && (deltaX < width * 0.4)) this.switchColumnOrder({ from: this.column.id, to: e.id });
        if (direction === 'right' && (deltaX > width * 0.4)) this.switchColumnOrder({ from: e.id, to: this.column.id });
      };

      // console.log('current:', currentMousePositionX, 'boxX:', x, 'delta:', currentMousePositionX - x)
    }
  },

  mounted() {
    this.$root.$on('columndrag', this.handleColumDrag)
  },

  destroyed() {
    this.$root.$off('columndrag', this.handleColumDrag)
  },

  updated () {
    console.log('updated')
  }
};
</script>

<style lang="scss">
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .column-wrapper {
    position: relative;
    display: inline-block;
    margin-right: spacing('default');
    width: calc(100% - #{spacing('default') * 2} + 10px);
    max-width: 320px;
    min-height: 320px;
    max-height: 100%;
    font-size: font-size('xlarge');
    vertical-align: top;

    &:first-child {
      margin-left: spacing('default');
    }

    &.dragging {
      background: lightblue;
    }
  }

  .column {
    position: relative;
    width: 100%;
    user-select: none;

    >.header {
      padding: spacing('default');
      margin-bottom: spacing('xsmall');

      >.title {
        font-size: font-size('default');
      }

      >.description {
        font-size: font-size('xsmall');
      }
    }

  }
</style>
