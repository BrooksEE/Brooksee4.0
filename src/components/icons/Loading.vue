<script setup lang="ts">

</script>
<template>
    <div class="loader"></div>
</template>
<style scoped>
.loader {
  height: 15px;
  aspect-ratio: 4;
  display: grid;
  animation: l31-0 1s infinite; 
}
.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
  --_g: no-repeat radial-gradient(farthest-side,#000 94%,#0000);
  background:
    var(--_g) left,
    var(--_g) right;
  background-size: 25% 100%;
}
.loader:after {
  transform: rotate(0) translate(37.5%) rotate(0);
  animation: inherit;
  animation-name: l31-1; 
}
@keyframes l31-0 {
  100% {transform:translate(37.5%)}
}
@keyframes l31-1 {
  100% {transform:rotate(-.5turn) translate(37.5%) rotate(.5turn)}
}
</style>