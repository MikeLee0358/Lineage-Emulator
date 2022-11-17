<script setup>
import { useRoleStore } from "../stores/roles";
import { ref } from "vue";
const domForRestartFn = ref();
const roleStore = useRoleStore();

function toggleFunctionUI(e) {
  const target = e.target;

  const logoutList = () => {
    const getName = target.className.slice(6);
    const resetRoleList = function () {
      target.parentElement.children[0].children[0].classList.remove("toggleTurnOn");
    };
    const changeRoleTo = function (name) {
      // when changed role, reset some related function through DOM traverse.
      roleStore.currentRole = name.toLowerCase();
      const resetRestart = target.parentElement.classList.toggle("toggleTurnOn");
      const resetLogoutBtn = target.parentElement.parentElement.parentElement.classList.toggle(
        "toggleTurnOn"
      );
      const resetCharacterBtn = target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.classList.add(
        "toggleTurnOff"
      );
    };

    switch (target.className) {
      case "logoutBtn":
        target.children[0].classList.toggle("toggleTurnOn");
        break;

      case "logoutRestart":
        target.children[0].classList.toggle("toggleTurnOn");
        break;

      case "logoutExit":
        resetRoleList();
        console.log("exit");
        break;

      case "logoutClose":
        resetRoleList();
        target.parentElement.classList.toggle("toggleTurnOn");
        break;

      case "logoutCancel":
        resetRoleList();
        target.parentElement.classList.toggle("toggleTurnOn");
        break;

      case "logoutPrince":
        changeRoleTo(getName);
        break;

      case "logoutKnight":
        changeRoleTo(getName);
        break;

      case "logoutElf":
        changeRoleTo(getName);
        break;

      case "logoutMagician":
        changeRoleTo(getName);
        break;
    }
  };

  if (target.className.includes("logout")) {
    logoutList();
  } else if (target.className.includes("character")) {
    const logoutListTurnOff = target.children[0].classList.toggle("toggleTurnOff");
    logoutListTurnOff;
  }
}
</script>

<template>
  <ul @click="toggleFunctionUI">
    <li class="characterBtn" ref="domForRestartFn">
      <EquipmentList class="equipmentList" />
    </li>

    <li class="logoutBtn">
      <ul class="logoutList">
        <li class="logoutRestart">
          <figure class="logoutRoleList">
            <img
              src="../assets/prince/logo_prince.png"
              class="logoutPrince"
              alt="prince-logo"
            />
            <img
              src="../assets/knight/logo_knight.png"
              class="logoutKnight"
              alt="knight-logo"
            />
            <img src="../assets/elf/logo_elf.png" alt="elf-logo" class="logoutElf" />
            <img
              src="../assets/magician/logo_magician.png"
              class="logoutMagician"
              alt="magician-logo"
            />
          </figure>
        </li>
        <li class="logoutExit"></li>
        <li class="logoutCancel"></li>
        <li class="logoutClose"></li>
      </ul>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.toggleTurnOff {
  // 其他層有display做預設。因為層級太高，不想增加無謂的css提高權重去做覆蓋，所以設定important。
  visibility: hidden !important;
}
.toggleTurnOn {
  visibility: visible !important;
}

.characterBtn {
  position: absolute;
  inset: 0 73% 0 13.5%;

  .equipmentList {
    visibility: visible;
    position: absolute;
    inset: -2210% 46vw 686% -80.5vw;
    background-image: url("/src/assets/UI/UI_equip.png");
    background-size: cover;
    background-repeat: round;
  }
}

.logoutBtn {
  position: absolute;
  inset: 0% 0% 0% 86.5%;

  .logoutList {
    visibility: hidden;
    position: absolute;
    inset: -2210% 0% 0% -1140%;
    width: 37.3vw;
    height: 1655%;

    background-image: url("src/assets/UI/UI_logout.png");
    background-size: cover;
    background-repeat: round;

    .logoutRestart {
      position: absolute;
      inset: 20% 30% 74% 44%;

      .logoutRoleList {
        display: flex;
        width: 200%;
        height: 150%;
        position: absolute;
        inset: -275% 0 0 -90%;
        gap: 1%;

        opacity: 0.8;
        visibility: hidden;
      }
    }
    .logoutExit {
      position: absolute;
      inset: 29% 34% 65% 49%;
    }
    .logoutCancel {
      position: absolute;

      inset: 37% 34% 56% 49%;
    }
    .logoutClose {
      position: absolute;
      inset: 0% 83% 94% 3%;
    }
  }
}
</style>
