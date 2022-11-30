<template>
  <section class="uiChracter show">
    <div class="close" @click.stop="closeUI"></div>
    <ul class="panelNumber">
      <ul class="level">
        <li class="lv">{{ roleData.basic.lv }}</li>
        <li class="exp">{{ roleData.basic.exp }}</li>
      </ul>
      <ul class="basic">
        <li class="hp">{{ roleData.basic.hp }}/{{ roleData.basic.hp }}</li>
        <li class="mp">{{ roleData.basic.mp }}/{{ roleData.basic.mp }}</li>
        <li class="ac">{{ roleData.basic.ac }}</li>
      </ul>
      <ul class="attributes">
        <li class="str">{{ roleData.basic.str }}</li>
        <li class="dex">{{ roleData.basic.dex }}</li>
        <li class="con">{{ roleData.basic.con }}</li>
        <li class="int">{{ roleData.basic.int }}</li>
        <li class="wis">{{ roleData.basic.wis }}</li>
        <li class="cha">{{ roleData.basic.cha }}</li>
      </ul>
      <li class="mr">{{ roleData.basic.mr }}</li>
    </ul>
    <ul class="panelEquip" @click.stop="algorithmStore.algorithm()">
      <li
        v-for="equip in roleData.equips"
        :key="equip.id"
        class="equip"
        :class="equip.category"
        :style="{ backgroundImage: `url(${equip.src})` }"
        @click="dataForAlgorithm(equip)"
        :data-displayEquipInfo="getEquipInfo(equip)"
      ></li>
    </ul>
  </section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoleStore } from "../stores/role";
import { useAlgorithmStore } from "../stores/algorithm";

const roleStore = useRoleStore();
const algorithmStore = useAlgorithmStore();
const { roleData } = storeToRefs(roleStore);

const closeUI = (e) => e.target.parentElement.classList.remove("show");
const getEquipInfo = (equip) => {
  let equipInfo = "";

  const getName = () => {
    const equipName = equip.name;
    const equipValue = equip.value;
    const equipArmor = equip.armor;
    const equipAttack = equip.attack;

    const showPlusOrMinus = (value) => {
      if (value === 0) return `+0`;
      return value > 0 ? `+${value}` : value;
    };
    const isTwoHandsWeapon = () => {
      return equip.grip === "雙手武器" ? "\n 雙手武器" : "";
    };

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
    } else if (equip.category.includes("jewelry")) {
      return `${equipName} (使用中)`;
    }
  };
  const getFeature = () => {
    //Jewelry are not opened yet
    if (equip.category.includes("jewelry")) return ``;
    const hasFeature = equip.feature;
    const occupation = equip.occupation;

    if (hasFeature) {
      return `可使用職業:
${occupation}
  ${hasFeature}`;
    } else {
      return `可使用職業:
${occupation}`;
    }
  };
  const getMaterial = () => {
    //Jewelry are not opened yet
    if (equip.category.includes("jewelry")) return ``;
    const toDisplay = equip;

    return `材質:${toDisplay.material}
  重量 ${toDisplay.weight}`;
  };

  equipInfo = `${getName()}
  ${getFeature()}
  ${getMaterial()}`;

  return equipInfo;
};
const dataForAlgorithm = (equip) => {
  algorithmStore.targetName = equip.name;
  algorithmStore.targetValue = equip.value;
  algorithmStore.targetCategory = equip.category;
  algorithmStore.targetSafetyValue = equip.safetyValue;

  // Updating data to trigger reactivity for rendering getEquipInfo()
  setTimeout(() => {
    equip.value = algorithmStore.targetValue;
  }, 0);
};
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";
.show {
  visibility: visible !important;
}

.uiChracter {
  position: absolute;
  inset: -2215% 1487% 704% -2759%;
  background-image: url("/src/assets/UI/UI_character.png");
  background-size: cover;
  background-repeat: round;
  visibility: hidden;

  .close {
    position: absolute;
    inset: 0 0 93% 87%;
    z-index: 1;
  }
  .panelEquip {
    position: absolute;
    inset: 0;
    .equip {
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
        border-width: 0.22vw;
        display: none;

        font-size: 1.3vw;
        line-height: 100%;
        @extend %templateInfoStyle;
        color: var(--color-white);
      }

      &:hover::after {
        display: block;
      }

      &.weapon {
        top: 52.2%;
        left: 36.1%;
      }

      &.armor {
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

      &.jewelry {
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
  }
  .panelNumber {
    position: absolute;
    inset: -32.65%;
    text-align: center;
    line-height: 50%;
    transform: scale(0.6);

    .level {
      position: absolute;
      inset: 2.5% 15% 90.5% 30%;
      display: grid;
      grid-auto-flow: column;
      align-items: center;
      gap: 5%;
      padding-top: 0.75%;
      .lv {
        justify-self: right;
      }
      .exp {
        justify-self: left;
      }
    }
    .basic {
      position: absolute;
      inset: 12.5% 46% 73% 30%;
      display: grid;
      align-items: center;
    }
    .attributes {
      position: absolute;
      inset: 41.5% 68% 30% 13%;
      display: grid;
      align-items: center;
    }
    .mr {
      position: absolute;
      inset: 90.5% 23% 6% 63%;
      display: grid;
      align-items: center;
    }
  }
}

@media screen and (min-height: 433px) {
  .uiChracter .panelNumber {
    transform: unset;
    inset: 0%;
    top: 0.5%;
    font-size: clamp(9.5px, 2.65vmin, 2.5rem);
  }
}
</style>
