<template>
  <ul class="uiLogout" ref="uiLogoutNode" @click.stop="uiLogoutHandler">
    <li class="close"></li>
    <li class="restart">
      <figure class="roleList">
        <img src="../assets/prince/logo_prince.png" class="prince" alt="prince-logo" />
        <img src="../assets/knight/logo_knight.png" class="knight" alt="knight-logo" />
        <img src="../assets/elf/logo_elf.png" alt="elf-logo" class="elf" />
        <img
          src="../assets/magician/logo_magician.png"
          class="magician"
          alt="magician-logo"
        />
      </figure>
    </li>
    <li class="exit"></li>
    <li class="cancel"></li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { useRoleStore } from "../stores/roles";

const roleStore = useRoleStore();
const uiLogoutNode = ref();

const uiLogoutHandler = (e) => {
  const classTarget = e.target.className;
  const classLogout = uiLogoutNode.value.classList;
  const classRoleList = uiLogoutNode.value.children[1].firstElementChild.classList;

  const changeRoleTo = (role) => {
    roleStore.roleNow = role;
  };
  const resetLogoutUI = () => {
    classLogout.toggle("show");
    classRoleList.remove("show");
  };
  const removeUIChracter = () => {
    const uiFunction = Array.from(
      uiLogoutNode.value.parentElement.parentElement.children
    );

    uiFunction.forEach((btn) => {
      if (btn.className === "btnCharacter") {
        btn.firstElementChild.classList.remove("show");
      }
    });
  };

  if (classTarget === "exit") {
    resetLogoutUI();
    removeUIChracter();
  } else if (classTarget === "restart") {
    classRoleList.toggle("show");
  } else if (["close", "cancel"].includes(classTarget)) {
    resetLogoutUI();
  } else if (["elf", "prince", "knight", "magician"].includes(classTarget)) {
    changeRoleTo(classTarget);
    resetLogoutUI();
    removeUIChracter();
  }
};
</script>

<style lang="scss" scoped>
.uiLogout {
  visibility: hidden;
  position: absolute;
  inset: -2215% 0% 704% -1046%;

  background-image: url("src/assets/UI/UI_logout.png");
  background-size: cover;
  background-repeat: round;

  .restart {
    position: absolute;
    inset: 20% 30% 74% 44%;

    .roleList {
      display: grid;
      grid-auto-flow: column;
      width: 250%;
      height: 233%;
      position: relative;
      inset: -235% 0 0 -79%;
      visibility: hidden;

      img {
        opacity: 0.25;
        position: relative;
      }

      img:hover {
        opacity: 1;
      }
      .prince {
        top: 20%;
        left: -30%;
      }
      .knight {
        top: 25%;
        left: 210%;
      }
      .elf {
        top: 140%;
        left: -220%;
      }
      .magician {
        top: 140%;
        left: 10%;
      }
    }
  }

  .exit {
    position: absolute;
    inset: 29% 34% 65% 49%;
  }

  .cancel {
    position: absolute;

    inset: 37% 34% 56% 49%;
  }

  .close {
    position: absolute;
    inset: 0% 83% 94% 3%;
  }
}
</style>
