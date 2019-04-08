<template>
  <button class="button">
    <slot/>
  </button>
</template>

<style lang="scss">
  @import '../style/modules/colors.module';
  @import '../style/modules/spacing.module';
  @import '../style/modules/typography.module';

  .button {
    padding: spacing('small') spacing('default');

    // Typography
    @include typography-poppins-semibold(font-size(xxxxsmall));
    letter-spacing: .5px;
    border-radius: 40px;

    border: none;
    background: blue(default);
    color: white;

    cursor: pointer;

    &:focus {
      outline: none;
    }

    > .material-icons {
      vertical-align: middle;
    }
  }
</style>
