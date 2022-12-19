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

    const toggleFont = () => {
      const isModeFull = () => {
        return getHeightAsPercentage() === 100 ? true : false;
      };
      const getUIArrNodes = (uiNodes) => {
        return Array.from(uiNodes);
      };

      const toggleFontUIChat = () => {
        const nodesUIChat = document.querySelectorAll(".uiChat li");
        getUIArrNodes(nodesUIChat).forEach((fontNode) => {
          const changeScaleY = (value) => {
            fontNode.style = `transform: scaleY(${value})`;
          };

          if (isModeFull()) return changeScaleY(0.64);
          // mode: Movie
          changeScaleY(0.5);
        });
      };

      const toggleFontUINumber = () => {
        const nodesUIRoleNumber = document.querySelector(".uiRoleNumber");
        //movie mode heigthRate = 0.8
        const isHeightOver320 = (heightRate = 1) => {
          return container.offsetHeight > 320 * heightRate ? true : false;
        };
        const isHeightOver480 = (heightRate = 1) => {
          return container.offsetHeight > 480 * heightRate ? true : false;
        };
        const changeScaleAndInset = (scale, inset) => {
          nodesUIRoleNumber.style = ` transform: scale(${scale}); inset: ${inset}`;
        };

        const changeParams = (scale, inset, fontSize) => {
          nodesUIRoleNumber.style = ` transform:: scale(${scale}); inset: ${inset}; font-size: ${fontSize}`;
        };

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

      toggleFontUIChat();
      toggleFontUINumber();
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
