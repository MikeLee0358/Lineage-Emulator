<template>
  <ul class="uiMagic">
    <li class="close" @click.stop="closeUI"></li>
    <ul class="magicNumber">
      <li class="magicPower">0</li>
      <li class="magicResist">{{ storeRole.getMR() }}</li>
    </ul>
  </ul>
</template>

<script setup>
import { useRoleStore } from "../stores/role";
const storeRole = useRoleStore();
const closeUI = (e) => {
  e.target.parentElement.classList.remove("visible");
};
</script>

<style lang="scss" scope>
@use "../scss/common.scss";

.uiMagic {
  visibility: hidden;
  position: absolute;
  inset: -2216% -430% 704.8% -629.4%;
  background-image: url("src/assets/UI/UI_magic.png");
  background-size: cover;
  background-repeat: round;

  .close {
    inset: 0% 85% 94% 2%;
    @extend %close;
  }

  .magicNumber {
    position: absolute;
    inset: 89.75% -22% 2% 2%;
    transform: scale(0.47);
    display: flex;
    align-items: center;
    text-align: center;
    gap: 43%;
    // background: red;
    // opacity: 0.3;

    .magicPower {
      flex-basis: 23%;
      // background: green;
    }
    .magicResist {
      flex: 1;
      // background: blue;
    }
  }
}

@media screen and (min-height: 321px) {
  .uiMagic .magicNumber {
    transform: scale(0.6);
    inset: 90% -8% 2.65% 15%;
  }
}

@media screen and (min-height: 480px) {
  .uiMagic .magicNumber {
    font-size: 3.6vmin;
  }
}
</style>
