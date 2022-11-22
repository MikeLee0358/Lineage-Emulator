<template>
  <ul class="logoutUI" ref="logoutUINode" @click.stop="logoutUIHandler">
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
import { useRoleStore } from "../stores/roles";
import { ref } from "vue";
const roleStore = useRoleStore();
const logoutUINode = ref();

function logoutUIHandler(e) {
  const targetClass = e.target.className;
  const logoutClass = logoutUINode.value.classList;
  const roleListClass = logoutUINode.value.children[1].firstElementChild.classList;

  function removeCharacterUI() {
    const functionUIArr = Array.from(
      logoutUINode.value.parentElement.parentElement.children
    );

    functionUIArr.forEach((btn) => {
      if (btn.className === "characterBtn") {
        btn.firstElementChild.classList.remove("show");
      }
    });
  }
  function changeRoleTo(role) {
    roleStore.currentRole = role;
  }
  function resetLogoutUI() {
    logoutClass.toggle("show");
    roleListClass.remove("show");
  }

  switch (targetClass) {
    case "close":
      resetLogoutUI();
      break;

    case "restart":
      roleListClass.toggle("show");
      break;

    case "exit":
      resetLogoutUI();
      removeCharacterUI();
      break;

    case "cancel":
      resetLogoutUI();
      break;

    case "prince":
      changeRoleTo(targetClass);
      resetLogoutUI();
      removeCharacterUI();

      break;

    case "knight":
      changeRoleTo(targetClass);
      resetLogoutUI();
      removeCharacterUI();
      break;

    case "elf":
      changeRoleTo(targetClass);
      resetLogoutUI();
      removeCharacterUI();
      break;

    case "magician":
      changeRoleTo(targetClass);
      resetLogoutUI();
      removeCharacterUI();
      break;
  }
}
</script>

<style lang="scss" scoped>
.logoutUI {
  visibility: hidden;
  position: absolute;
  inset: -2210% 0% 0% -1140%;
  width: 37.3vw;
  height: 1655%;

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
      position: relative;
      inset: -210% 0 0 -80%;
      height: 130%;
      visibility: hidden;
      gap: 3%;

      img {
        opacity: 0.3;
      }

      img:hover {
        opacity: 1;
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
