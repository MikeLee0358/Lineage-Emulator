<template>
  <ul class="uiSetting" @click.stop="handleUISetting">
    <li class="close"></li>
    <li>選項：</li>
    <li>背景音樂：開／關</li>
    <li class="mode">螢幕模式:電影黑邊/全螢幕</li>
  </ul>
</template>

<script setup>
const handleUISetting = (e) => {
  const targetClass = e.target.className;
  const closeUI = () => {
    e.target.parentElement.classList.remove("visible");
  };

  if (e.target.tagName !== "LI") return;

  if (targetClass === "close") closeUI();

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

    const toggleFont = () => {
      const nodeLine1 = document.querySelector(".line1");
      const nodeUIChat = document.querySelectorAll(".uiChat li");
      const nodeUINumber = document.querySelector(".uiNumber");
      const nodeMagicNumber = document.querySelector(".magicNumber");
      const nodeUIRoleNumber = document.querySelector(".uiRoleNumber");

      const isModeFull = () => {
        return getHeightAsPercentage() === 100 ? true : false;
      };
      const getUIArrNodes = (uiNodes) => {
        return Array.from(uiNodes);
      };
      const isHeightOver320 = (heightRate = 1) => {
        return container.offsetHeight > 320 * heightRate ? true : false;
      };
      const isHeightOver480 = (heightRate = 1) => {
        return container.offsetHeight > 480 * heightRate ? true : false;
      };

      const changeParams = (scale, inset, fontSize) => {
        nodeUIRoleNumber.style = ` transform: scale(${scale}); inset: ${inset}; font-size: ${fontSize}`;
      };
      const changeScaleY = (node, value) => {
        node.style = `transform: scaleY(${value})`;
      };
      const changeFontSize = (fontSize) => {
        nodeMagicNumber.style = `font-size: ${fontSize}`;
      };
      const changeFontAndGap = (fontSize, gap) => {
        nodeLine1.style = `gap: ${gap}`;
        nodeUINumber.style = `font-size: ${fontSize}`;
      };
      const changeScaleAndInset = (scale, inset) => {
        nodeUIRoleNumber.style = ` transform: scale(${scale}); inset: ${inset}`;
      };

      const toggleFontUIChat = () => {
        getUIArrNodes(nodeUIChat).forEach((fontNode) => {
          if (isModeFull()) return changeScaleY(fontNode, 0.64);
          // mode: Movie
          changeScaleY(fontNode, 0.5);
        });
      };
      const toggleFontUIRoleNumber = () => {
        if (isModeFull()) {
          if (isHeightOver480()) return changeParams("unset", "0%", "3.3vmin");
          if (isHeightOver320()) return changeScaleAndInset(0.75, "-17%");
          return changeScaleAndInset(0.58, "-36%");
        }
        // mode: Movie
        if (isHeightOver480(0.8)) return changeParams("unset", "0%", "2.6vmin");
        if (isHeightOver320(0.8)) return changeScaleAndInset(0.6, "-34%");
        return changeScaleAndInset(0.47, "-56%");
      };
      const toggleFontUIMagic = () => {
        if (isModeFull() && isHeightOver480()) return changeFontSize("5vmin");
        // mode: Movie
        changeFontSize("3.6vmin");
      };

      const toggleFontUINumber = () => {
        if (isModeFull()) {
          if (!isHeightOver320()) return changeFontAndGap("3.4vw", "10vw");
          if (isHeightOver480()) return changeFontAndGap("3.3vw", "10vw");
        }

        if (!isHeightOver320()) return changeFontAndGap("2.8vw", "10vw");
        changeFontAndGap("3vw", "11vw");
      };

      toggleFontUIChat();
      toggleFontUIMagic();
      toggleFontUINumber();
      toggleFontUIRoleNumber();
    };

    toggleMode();
    toggleFont();
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
