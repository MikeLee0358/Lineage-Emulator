<template>
  <ul class="uiNumber">
    <li class="line1">
      <div class="lv">47</div>
      <div class="exp">25.80%</div>
    </li>
    <li class="line2">
      <div class="ac">-39</div>
      <div class="state">32762</div>
    </li>
  </ul>
</template>

<style setup></style>

<style lang="scss" scoped>
.uiNumber {
  grid-area: uiNumber;
  position: absolute;
  inset: -15.65% -37% 32.5% -24%;
  display: flex;
  flex-direction: column;
  transform: scale(0.5);
  text-align: center;
  font-size: 2.8vw;
  gap: 7%;
  line-height: 100%;

  .line1 {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 48%;
    padding-left: 12%;
  }
  .line2 {
    flex: 1;

    display: flex;
    gap: 26%;
    align-items: center;

    .ac {
      flex-basis: 31%;
    }
    .state {
      flex: 1;
    }
  }
}

@media screen and (min-height: 480px) {
  .uiNumber {
    font-size: 3vw;
  }
}
</style>
