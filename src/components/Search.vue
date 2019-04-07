<template>
  <input class="search" type="search" name="search" id="" placeholder="PROCURAR CARD">
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '../style/modules/spacing.module';
@import '../style/modules/typography.module';

.search {
  padding: spacing(small) spacing(small);

  @include typography-poppins-semibold(font-size(xxxxsmall));
  letter-spacing: .5px;

  background: #FFFFFF;
  border: 1px solid #EDEDED;
  border-radius: 40px;

  &:focus {
    border-color: #000000;
    outline: none;
  };

  &::placeholder {
    color: #A6A6A6;
  };
}
</style>

