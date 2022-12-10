<template>
  <ul class="uiLogout" ref="uiLogoutNode" @click.stop="uiLogoutHandler">
    <li class="close"></li>
    <li class="restart">
      <figure class="roleList">
        <img src="../assets/royal/logo_royal.png" class="royal" alt="royal-logo" />
        <img src="../assets/knight/logo_knight.png" class="knight" alt="knight-logo" />
        <img src="../assets/elf/logo_elf.png" alt="elf-logo" class="elf" />
        <img src="../assets/mage/logo_mage.png" class="mage" alt="mage-logo" />
      </figure>
    </li>
    <li class="exit"></li>
    <li class="cancel"></li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { useRoleStore } from "../stores/role";
import { useChatStore } from "../stores/chat";

const storeRole = useRoleStore();
const storeChat = useChatStore();
const uiLogoutNode = ref();

const uiLogoutHandler = (e) => {
  const classTarget = e.target.className;
  const classLogout = uiLogoutNode.value.classList;
  const classRoleList = uiLogoutNode.value.children[1].firstElementChild.classList;

  const changeRoleTo = (role) => {
    storeRole.role.currentRole = role;
  };
  const resetLogoutUI = () => {
    classLogout.toggle("show");
    classRoleList.remove("show");
  };
  const removeuiRole = () => {
    const uiFunction = Array.from(
      uiLogoutNode.value.parentElement.parentElement.children
    );

    uiFunction.forEach((btn) => {
      if (btn.className === "btnRole") {
        btn.firstElementChild.classList.remove("show");
      }
    });
  };

  if (["exit"].includes(classTarget)) {
    removeuiRole();
    resetLogoutUI();
    storeChat.cleanChatLines();
  } else if (["restart"].includes(classTarget)) {
    classRoleList.toggle("show");
  } else if (["close", "cancel"].includes(classTarget)) {
    resetLogoutUI();
  } else if (["elf", "mage", "royal", "knight"].includes(classTarget)) {
    removeuiRole();
    resetLogoutUI();
    changeRoleTo(classTarget);
    storeChat.cleanChatLines();
  }
};
</script>

<style lang="scss" scoped>
.uiLogout {
  visibility: hidden;
  position: absolute;
  inset: -2216% 0% 704.8% -1016.55%;

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
      .royal {
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
      .mage {
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
