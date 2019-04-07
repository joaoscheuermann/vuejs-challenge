<template>
  <div class="column-wrapper">
    <draggable 
      class="column"
      ref="draggable"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
      @drag="handleDrag">

      <div class="header">
        <div class="title"> {{column.title}} </div>

        <div class="search-wrapper">
          <Search />
          <Button> <i class="material-icons"> sort_by_alpha </i> </Button>
        </div>

        <div class="id"> {{ column.id }} </div>
      </div>

      <Card v-for="id in cards" :id="id" :key="id"/>

      <div class="button-wrapper">
        <Button @click.native="handleAddCardButtonClick"> ADICIONAR CARD <i class="material-icons"> add </i> </Button>
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

  computed: {
    column() {
      return this.$store.getters['columns/column'](this.id);
    },

    cards() {
      return this.$store.getters['cards/order'](this.id);
    },
  },

  data() {
    return {
      dragging: false
    };
  },

  methods: {
    ...mapActions('cards', [
      'addCard'
    ]),
    ...mapActions('columns', [
      'flipColumns'
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
      const { currentMousePositionX, currentMousePositionY, directionX } = e.event;

      function intersectionX (x, area) {
        return x > area.x && x < (area.x + area.width)
      };
      
      // Check for intersections in X
      if (intersectionX(currentMousePositionX, { x, width })) {
        const deltaX = currentMousePositionX - x;

        if ((directionX === 'right' && (deltaX > width * 0.5)) || (directionX === 'left' && (deltaX < width * 0.5))) {
          this.flipColumns({ from: e.id, to: this.id })
          // this.$refs.draggable.updatePosition({ clientX: currentMousePositionX, cientY: currentMousePositionY })
        }
      };

    },

    handleAddCardButtonClick () {
      this.addCard({ parentID: this.id })
    }
  },

  mounted() {
    this.$root.$on('columndrag', this.handleColumDrag);
  },

  destroyed() {
    this.$root.$off('columndrag', this.handleColumDrag);
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
  }

  .column {
    width: 100%;

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
          width: calc(100% - 54px);
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
    }
  }
</style>
