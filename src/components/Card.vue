<template>
  <div :class="{ 'card-wrapper': true, dragging }">
    <draggable
      ref="draggable"
      class="card"
      @mousedown.native="handleDraggableMouseDown"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
      @drag="handleDrag">

      <div class="title"> {{ card.title }} </div>
      <div class="description"> {{ card.description }} </div>

      <div class="id"> {{ card.id }} </div>

      <div class="remove" @click="handleRemoveCardClick">REMOVER CARD</div>
    </draggable>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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

  data() {
    return {
      dragging: false,
    }
  },

  methods: {
    ...mapActions('cards', [
      'flipCards',
      'removeCard'
    ]),

    intersection (value, start, length) {
      return value > start && value < (start + length);
    },

    handleRemoveCardClick() {
      this.removeCard({ card: this.card.id })
    },

    handleDraggableMouseDown() {
      this.$el.style.height = this.$refs.draggable.$el.getBoundingClientRect().height + 'px';
    },

    handleDragStart() {
      this.dragging = true;
    },
    handleDragEnd() {
      this.dragging = false;
      this.$el.style = null;
    },
    handleDrag(e) {
      this.$root.$emit('carddrag', { card: this.card.id, column: this.card.parent, event: e });
    },

    handleCardDrag(e) {
      if(e.column !== this.card.parent || e.card === this.card.id) return

      const { y, height } = this.$el.getBoundingClientRect();
      const { directionY, currentMousePositionY } = e.event;
      const deltaY = currentMousePositionY - y;

      if (this.intersection(currentMousePositionY, y, height) && ((directionY === 'up' && (deltaY > height * 0.5)) || (directionY === 'down' && (deltaY < height * 0.5)))) this.flipCards({ from: e.card, to: this.card.id })
    },
  },

  mounted() {
    this.$root.$on('carddrag', this.handleCardDrag);
  },

  destroyed() {
    this.$root.$off('carddrag', this.handleCardDrag);
  },
};
</script>

<style lang="scss">
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .card-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: spacing(small);

    &.dragging {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;

      >.card {
        box-shadow: 0px 0px 6px rgba(55, 72, 232, 0.2);
      }
    }
  }

  .card {
    position: relative;
    padding: spacing('default');
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

    >.remove {
      @include typography-poppins-semibold(12px);
      padding-top: spacing(default);
      color: red;
      text-align: right;
      cursor: pointer;
    }
  }

</style>
