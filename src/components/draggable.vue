<template>
  <div @mousedown="handleMouseDown">
    <slot/>
  </div>
</template>

<script>

export default {
  props: {
    draggable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
  },

  data() {
    return {
      moving: false,

      // Simple values
      startX: null,
      startY: null,
      deltaX: null,
      deltaY: null,

      // Mouse Position
      currentMousePositionX: null,
      currentMousePositionY: null,

      // DOM Rect
      rect: {
        x: null,
        y: null,
        width: null,
        height: null,
      },

      parentRect: {
        x: null,
        y: null,
        width: null,
        height: null,
      }
    };
  },

  methods: {
    getProperties() {
      return { ...this._data }
    },

    updateRect() {
      const rect = this.$el.getBoundingClientRect();
      this.rect.x = rect.x;
      this.rect.y = rect.y;
      this.rect.width = rect.width;
      this.rect.height = rect.height;
    },

    updateParentRect() {
      const parentRect = this.$parent.$el.getBoundingClientRect();
      this.parentRect.x = parentRect.x;
      this.parentRect.y = parentRect.y;
      this.parentRect.width = parentRect.width;
      this.parentRect.height = parentRect.height;
    },

    updatePosition({clientX, clientY}) {
      const { startX, startY, offsetX, offsetY, getProperties, updateRect, updateParentRect } = this;

      updateRect();
      updateParentRect();

      if (!this.moving) {
        this.moving = true;
        this.$emit('dragstart', getProperties());
      };

      this.currentMousePositionX = clientX;
      this.currentMousePositionY = clientY;

      const futureDeltaX = this.currentMousePositionX - this.parentRect.x - this.startX;
      const futureDeltaY = this.currentMousePositionY - this.parentRect.y - this.startY;

      const directionX = futureDeltaX - this.deltaX >= 0 ? 'right' : 'left';
      const directionY = futureDeltaY - this.deltaY >= 0 ? 'up' : 'down';

      this.deltaX = futureDeltaX
      this.deltaY = futureDeltaY

      this.$el.style.left = `${ this.deltaX }px`;
      this.$el.style.top = `${ this.deltaY }px`;

      this.$emit('drag', Object.assign(getProperties(), { directionX, directionY }));
    },

    handleMouseDown(e) {
      e.stopPropagation();

      const { handleMouseMove, handleMouseUp, updateRect, updateParentRect } = this;
      this.$el.style.position = 'absolute';
      this.$el.style['z-index'] = '999';

      // Saves global positioning and size data
      updateRect();
      updateParentRect();

      this.startX = e.clientX - this.rect.x;
      this.startY = e.clientY - this.rect.y;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },

    handleMouseUp() {
      const { handleMouseMove, handleMouseUp, getProperties } = this;
      
      this.moving = false;

      // ADD PERSIST OPTION
      this.$el.style = null;

      this.$emit('dragend', getProperties());

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    },

    handleMouseMove(e) {
      this.updatePosition(e);
    },
  },

  mounted() {

  },

  destroyed() {

  },

  updated () {
  },
};
</script>


<style lang="scss">
</style>
