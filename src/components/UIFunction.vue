<template>
  <ul class="uiFunction" @click="toggleBtn">
    <li class="btnHelp">
      <UIHelp />
    </li>
    <li class="btnRole">
      <UIRole />
    </li>
    <li class="btnMagic">
      <UIMagic />
    </li>
    <li class="btnItems">
      <UIItems />
    </li>
    <li class="btnRelationship">
      <UIRelationship />
    </li>
    <li class="btnSetting">
      <UISetting />
    </li>
    <li class="btnLogout">
      <UILogout />
    </li>
  </ul>
</template>

<script setup>
import UIRelationship from "./UIRelationShip.vue";
import UIItems from "./UIItems.vue";
import UIMagic from "./UIMagic.vue";
import UIHelp from "./UIHelp.vue";
import UIRole from "./UIRole.vue";
import UISetting from "./UISetting.vue";
import UILogout from "./UILogout.vue";

const toggleBtn = (e) => {
  if (e.target.tagName !== "LI") return;
  const uiSideLeft = ["btnHelp", "btnRole", "btnSetting", "btnRelationship"];
  const uiSideRight = ["btnMagic", "btnItems", "btnLogout"];
  const targetClass = e.target.className;
  const targetUIClass = e.target.firstElementChild.className;

  const clearUI = (uiSide) => {
    const uiFunctionArrNodes = Array.from(e.target.parentElement.children);
    uiFunctionArrNodes.forEach((node) => {
      if (uiSide.includes(node.className)) {
        node.firstChild.classList.remove("show");
      }
    });
  };
  const toggleUITarget = () => {
    e.target.firstElementChild.classList.toggle("show");
  };

  // first if: get toggle btn feature
  if (targetUIClass.includes("show")) return toggleUITarget();
  else if (uiSideLeft.includes(targetClass)) clearUI(uiSideLeft);
  else clearUI(uiSideRight);

  toggleUITarget();
};
</script>

<style lang="scss" scoped>
.uiFunction {
  grid-area: uiFunction;
  position: relative;

  .btnHelp {
    position: absolute;
    inset: 0 85% 0 1%;
  }
  .btnRole {
    position: absolute;
    inset: 0 72% 0 15%;
  }
  .btnMagic {
    position: absolute;
    inset: 0 57% 0 30%;
  }
  .btnItems {
    position: absolute;
    inset: 0 43% 0 44%;
  }
  .btnRelationship {
    position: absolute;
    inset: 0 28% 0 58%;
  }
  .btnSetting {
    position: absolute;
    inset: 0 14% 0 72%;
  }
  .btnLogout {
    position: absolute;
    inset: 0% 0% 0% 86.5%;
  }
}

.show {
  visibility: visible !important;
}
</style>
