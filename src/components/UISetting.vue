<template>
  <ul class="uiSetting" @click.stop="handleUiSetting">
    <li class="close"></li>
    <li>選項：</li>
    <li>背景音樂：開／關</li>
    <li class="mode">螢幕模式:電影黑邊/全螢幕</li>
  </ul>
</template>

<script setup>
const handleUiSetting = (e) => {
  if (e.target.tagName !== "LI") return;
  const targetClass = e.target.className;

  if (targetClass === "close") {
    e.target.parentElement.classList.remove("visible");
  }

  if (targetClass === "mode") {
    const container = document.querySelector(".container");
    const getHeightAsPercentage = () => {
      const heightInPixels = container.offsetHeight;
      const parentHeight = container.parentElement.offsetHeight;
      //will get different values e.g., 79.5, 80.1...
      if ((heightInPixels / parentHeight) * 100 !== 100) return 80;
      return 100;
    };

    const toggleMode = () => {
      const getModeFull = () => {
        container.style = "height: 100%";
      };
      const getModeMovie = () => {
        container.style = "height: 80%";
      };

      if (getHeightAsPercentage() !== 100) return getModeFull();
      getModeMovie();
    };

    const toggleUIChatFont = () => {
      const isModeFull = () => {
        return getHeightAsPercentage() === 100 ? true : false;
      };
      const isHeightOver450 = () => {
        return container.offsetHeight >= 450 ? true : false;
      };
      const getUIChatFontArrNodes = () => {
        return Array.from(document.querySelectorAll(".uiChat li"));
      };

      getUIChatFontArrNodes().forEach((fontNode) => {
        const changeScaleY = (value) => {
          fontNode.style = `transform: scaleY(${value})`;
        };

        if (isModeFull()) {
          if (isHeightOver450()) return changeScaleY(0.8);
          return changeScaleY(0.65);
        }
        // mode: Movie
        if (isHeightOver450()) return changeScaleY(0.65);
        changeScaleY(0.5);
      });
    };

    toggleMode();
    toggleUIChatFont();
  }
};
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";
.uiSetting {
  visibility: hidden;
  position: absolute;
  inset: -2216% 1759.3% 704.8% -2901%;
  background-image: url("src/assets/UI/UI_template.png");
  background-size: cover;
  background-repeat: round;

  li {
    position: relative;
    top: 8%;
    left: 10%;
  }
  .close {
    inset: 0 0 93% 87%;
    @extend %close;
  }
}
</style>
