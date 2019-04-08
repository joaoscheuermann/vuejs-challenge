<template>
  <div :class="{ 'column-wrapper': true, dragging }">

    <draggable
      class="column"
      ref="draggable"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
      @drag="handleDrag">

      <div class="header">
        <div class="title"> {{column.title}} </div>

        <div class="search-wrapper">
          <Search @input="handleSearchInput"/>
        </div>

        <div class="id"> {{ column.id }} </div>
      </div>

      <Card v-for="id in cards" :id="id" :key="id"/>

      <div class="button-wrapper">
        <Button @click.native="handleAddCardButtonClick"> ADICIONAR CARD <i class="material-icons"> add </i> </Button>

        <div class="remove" @click="handleRemoveColumnClick">REMOVER COLUNA</div>
      </div>
    </draggable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import draggable from '@/components/draggable.vue';
import Search from '@/components/Search.vue';
import Button from '@/components/Button.vue';
import Card from '@/components/Card.vue';

export default {
  components: {
    draggable,
    Search,
    Button,
    Card,
  },

  props: {
    id: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      dragging: false,
      filter: ''
    };
  },

  computed: {
    column() {
      return this.$store.getters['columns/column'](this.id);
    },

    cards() {
      return this.$store.getters['cards/order'](this.id).filter(id => this.$store.state['cards'][id].title.toLowerCase().includes(this.filter.toLowerCase()));
    },
  },

  methods: {
    ...mapActions('cards', [
      'addCard',
      'changeCardParent'
    ]),
    ...mapActions('columns', [
      'flipColumns',
      'removeColumn'
    ]),

    intersection (value, start, length) {
      return value > start && value < (start + length);
    },

    // Event handling
    handleSearchInput(e) {
      this.filter = e.target.value
    },

    handleRemoveColumnClick() {
      this.removeColumn({ column: this.column.id })
    },

    handleDragStart(e) {
      this.dragging = true;
      this.$el.style.height = this.$refs.draggable.$el.getBoundingClientRect().height + 'px'
    },

    handleDragEnd(e) {
      this.dragging = false;
      this.$el.style = null;
    },

    handleDrag(e) {
      this.$root.$emit('columndrag', { column: this.column.id, event: e });
    },

    handleColumDrag (e) {
      if(e.column === this.column.id) return

      const { x, width } = this.$el.getBoundingClientRect();
      const { currentMousePositionX, currentMousePositionY, directionX } = e.event;
      const deltaX = currentMousePositionX - x;

      // Check for intersections in X
      if (this.intersection(currentMousePositionX, x, width) && ((directionX === 'right' && (deltaX > width * 0.5)) || (directionX === 'left' && (deltaX < width * 0.5)))) this.flipColumns({ from: e.column, to: this.id })
    },

    handleCardDrag(e) {
      if(e.column === this.column.id) return

      const { x, width } = this.$el.getBoundingClientRect();
      const { currentMousePositionX, currentMousePositionY } = e.event;

      if(this.intersection(currentMousePositionX, x, width)) this.changeCardParent({ card: e.card, parent: this.column.id })
    },

    handleAddCardButtonClick () {
      this.addCard({ parentID: this.id })
    }
  },

  mounted() {
    this.$root.$on('columndrag', this.handleColumDrag);
    this.$root.$on('carddrag', this.handleCardDrag);

    this.addCard({ parentID: this.id })
  },

  destroyed() {
    this.$root.$off('columndrag', this.handleColumDrag);
    this.$root.$off('carddrag', this.handleCardDrag);
  },

  updated () {
  }
};
</script>

<style lang="scss">
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .column-wrapper {
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 300px;

    user-select: none;

    margin-right: spacing(small);

    &:first-child {
      margin-left: spacing(small);
    }

    &.dragging {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;

      >.column {
        box-shadow: 0px 0px 6px rgba(55, 72, 232, 0.2);
      }
    }
  }

  .column {
    width: 100%;
    background: #FAFAFA;
    border-radius: 5px;

    >.header {
      padding-top: spacing('xlarge');
      padding-bottom: spacing('xxlarge');
      padding-left: spacing(default);
      padding-right: spacing(default);

      >.title {
        margin-bottom: spacing(small);
        @include typography-poppins-bold(font-size(default));
      }

      >.search-wrapper {
        >.search {
          width: 100%;
          margin-right: 10px;
        }
      }

      >.id {
        margin-top: 10px;
        @include typography-poppins-regular(9px);
        color: #A6A6A6;
        text-align: right;
      }
    }

    >.button-wrapper {
      text-align: right;
      padding-right: spacing(default);
      padding-bottom: spacing(xlarge);

      >.remove {
        @include typography-poppins-semibold(font-size(xxxsmall));
        padding: spacing(default);
        color: red;
        cursor: pointer;
      }
    }
  }
</style>
