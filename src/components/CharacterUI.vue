<template>
  <section @click.stop="algorithmStore.algorithm" class="characterUI show">
    <ul class="numberPanel">
      <ul class="level">
        <li class="lv">{{ roleData.basic.lv }}</li>
        <li class="exp">{{ roleData.basic.exp }}</li>
      </ul>
      <ul class="basic">
        <li class="hp">{{ roleData.basic.hp }}/{{ roleData.basic.hp }}</li>
        <li class="mp">{{ roleData.basic.mp }}/{{ roleData.basic.mp }}</li>
        <li class="ac">{{ roleData.basic.ac }}</li>
      </ul>
      <li class="mr">{{ roleData.basic.mr }}</li>
      <ul class="attributes">
        <li class="str">{{ roleData.basic.str }}</li>
        <li class="dex">{{ roleData.basic.dex }}</li>
        <li class="con">{{ roleData.basic.con }}</li>
        <li class="int">{{ roleData.basic.int }}</li>
        <li class="wis">{{ roleData.basic.wis }}</li>
        <li class="cha">{{ roleData.basic.cha }}</li>
      </ul>
    </ul>
    <ul class="equipPanel">
      <li
        v-for="equip in roleData.equips"
        :key="equip.id"
        class="equip"
        :class="equip.category"
        :data-displayEquipInfo="getEquipInfo(equip)"
        :style="{ backgroundImage: `url(${equip.src})` }"
        @click="dataForAlgorithm(equip)"
      ></li>
    </ul>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAlgorithmStore } from "../stores/algorithm";
import { useRoleStore } from "../stores/roles";

const roleStore = useRoleStore();
const algorithmStore = useAlgorithmStore();
const { roleData } = storeToRefs(roleStore);

function toggleCharacter(e) {
  e.target.firstElementChild.classList.toggle("show");
}

function dataForAlgorithm(equip) {
  algorithmStore.targetCategory = equip.category;
  algorithmStore.targetSafetyValue = equip.toDisplay.safetyValue;
  algorithmStore.targetValue = equip.toDisplay.value;

  // Updating data to trigger reactivity for rendering getEquipInfo()
  setTimeout(() => {
    equip.toDisplay.value = algorithmStore.targetValue;
  }, 0);
}

function getEquipInfo(equip) {
  function getName() {
    const equipValue = equip.toDisplay.value;
    const equipName = equip.name;
    const equipAttack = equip.toDisplay.attack;
    const equipArmor = equip.toDisplay.armor;

    function isTwoHandsWeapon() {
      return equip.toDisplay.grip === "雙手武器" ? "\n 雙手武器" : "";
    }
    function showPlusOrMinus(value) {
      if (value === 0) return `+0`;
      return value > 0 ? `+${value}` : value;
    }

    if (equip.category === "weapon") {
      return (
        `${showPlusOrMinus(equipValue)} ${equipName} (揮舞)
攻擊力 ${equipAttack.small}${showPlusOrMinus(equipValue)}/${
          equipAttack.large
        }${showPlusOrMinus(equipValue)}` + isTwoHandsWeapon()
      );
    } else if (equip.category.includes("armor")) {
      return `${showPlusOrMinus(equipValue)} ${equipName} (使用中)
防禦 ${equipArmor}${showPlusOrMinus(equipValue)}`;
    } else if (equip.category.includes("jewelries")) {
      return `${equipName} (使用中)`;
    }
  }
  function getFeature() {
    //Jewelries are not opened yet
    if (equip.category.includes("jewelries")) return ``;
    const hasFeature = equip.toDisplay.feature;
    const occupation = equip.toDisplay.occupation;

    if (hasFeature) {
      return `可使用職業:
${occupation}
  ${hasFeature}`;
    } else {
      return `可使用職業:
${occupation}`;
    }
  }
  function getMaterial() {
    //Jewelries are not opened yet
    if (equip.category.includes("jewelries")) return ``;
    const toDisplay = equip.toDisplay;

    return `材質:${toDisplay.material}
  重量 ${toDisplay.weight}`;
  }

  let equipInfo = `${getName()}
  ${getFeature()}
  ${getMaterial()}`;

  return equipInfo;
}
</script>

<style lang="scss" scoped>
@use '../scss/common.scss';
.show {
  visibility: visible !important;
}

.characterUI {
  position: absolute;
  inset: -2210% 46vw 686% -80.5vw;
  background-image: url("/src/assets/UI/UI_equip.png");
  background-size: cover;
  background-repeat: round;
  visibility: hidden;

  .equipPanel .equip {
    position: absolute;
    width: 11%;
    height: 9%;
    background-repeat: round;
    background-size: cover;
    color: transparent;

    &::after {
      content: attr(data-displayEquipInfo);
      position: absolute;
      top: 102%;
      z-index: 1;
      width: 375%;
      border-width: 0.3vw;
      display: none;

      font-size: 1.3vw;
      line-height: 102%;
      @extend %infoTemplateStyle;
      color: var(--color-white);
    }

    &:hover::after {
      display: block;
    }

    &.weapon {
      top: 52.2%;
      left: 36.1%;
    }

    &.armors {
      &.helmet {
        top: 13.5%;
        left: 71.2%;
      }

      &.shirt {
        top: 31%;
        left: 47.7%;
      }

      &.bodyArmor {
        top: 31%;
        left: 60%;
      }

      &.cloak {
        top: 31%;
        left: 72.2%;
      }

      &.shield {
        top: 44.2%;
        left: 79.2%;
      }

      &.gloves {
        top: 48.7%;
        left: 48.5%;
      }

      &.boots {
        top: 79.6%;
        left: 77.7%;
      }
    }

    &.jewelries {
      &.amulet {
        top: 19.3%;
        left: 58.7%;
      }

      &.left-ring {
        top: 42.2%;
        left: 34.7%;
      }

      &.belt {
        top: 41.2%;
        left: 64.9%;
      }

      &.right-ring {
        top: 54.5%;
        left: 78%;
      }

      &.amulet::after,
      &.belt::after,
      &.left-ring::after,
      &.right-ring::after {
        color: var(--color-grey);
        border: unset;
        background: unset;
        padding: unset;
        white-space: nowrap;
      }
    }
  }
  .numberPanel {
    position: absolute;
    inset: 0%;
    text-align: center;
    font-size: 2.2vmin;

    .level {
      position: absolute;
      inset: 4% 15% 91% 30%;
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      gap: 5%;
      padding-top: 0.5%;

      .lv {
        justify-self: right;
      }
      .exp {
        justify-self: left;
      }
    }
    .basic {
      position: absolute;
      inset: 13% 46% 73% 30%;
      display: grid;
      align-items: center;
      gap: 3%;
    }
    .attributes {
      position: absolute;
      inset: 41.3% 68% 30% 13%;
      display: grid;
      align-items: center;
    }
    .mr {
      position: absolute;
      inset: 90% 23% 6% 63%;
      display: grid;
      align-items: center;
    }
  }
}
</style>
