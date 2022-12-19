<template>
  <ul class="uiLogout" ref="uiLogoutNode" @click.stop="handleUILogout">
    <li class="close"></li>
    <li class="restart">
      <figure class="roleList">
        <img src="../assets/royal/logo_royal.png" class="royal" alt="royal-logo" />
        <img src="../assets/knight/logo_knight.png" class="knight" alt="knight-logo" />
        <img src="../assets/elf/logo_elf.png" alt="elf-logo" class="elf" />
        <img src="../assets/mage/logo_mage.png" class="mage" alt="mage-logo" />
        <img
          src="../assets/darkElf/logo_darkElf.png"
          class="darkElf"
          alt="darkElf-logo"
        />
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

const handleUILogout = (e) => {
  const sideLeftUI = ["btnHelp", "btnRole", "btnSetting", "btnRelationship"];
  const targetClass = e.target.className;
  const removeUI = (uiSide) => {
    const uiFunctionArrNodes = Array.from(
      uiLogoutNode.value.parentElement.parentElement.children
    );

    uiFunctionArrNodes.forEach((node) => {
      if (uiSide.includes(node.className)) {
        node.firstElementChild.classList.remove("visible");
      }
    });
  };
  const changeRoleTo = (role) => {
    storeRole.role.currentRole = role;
  };
  const toggleUILogout = () => {
    uiLogoutNode.value.classList.toggle("visible");
  };
  const toggleRoleList = () => {
    uiLogoutNode.value.children[1].firstElementChild.classList.toggle("visible");
  };
  const removeRoleList = () => {
    uiLogoutNode.value.children[1].firstElementChild.classList.remove("visible");
  };

  if (["restart"].includes(targetClass)) return toggleRoleList();
  if (["close", "cancel"].includes(targetClass)) {
    toggleUILogout();
    removeRoleList();
    return;
  }
  if (["elf", "mage", "royal", "knight", "darkElf"].includes(targetClass))
    changeRoleTo(targetClass);

  removeUI(sideLeftUI);
  toggleRoleList();
  toggleUILogout();
  storeChat.cleanChatLines();
  storeRole.isEquipedAttrArmor();
};
</script>

<style lang="scss" scoped>
@use "../scss/common.scss";
.uiLogout {
  visibility: hidden;
  position: absolute;
  inset: -2216% 0% 704.8% -1016.55%;

  background-image: url("src/assets/UI/UI_logout.png");
  background-size: cover;
  background-repeat: round;

  .restart {
    position: absolute;
    inset: 20% 31% 73% 43%;

    .roleList {
      display: grid;
      grid-auto-flow: column;
      width: 275%;
      height: 200%;
      position: relative;
      inset: -220% 0 0 -92%;
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
      }
      .knight {
        top: 25%;
        left: 300%;
      }
      .elf {
        top: 140%;
        left: -190%;
      }
      .mage {
        top: 135%;
        left: 100%;
      }
      .darkElf {
        top: 240%;
        left: -395%;
      }
    }
  }

  .exit {
    position: absolute;
    inset: 30% 35% 64% 47%;
  }

  .cancel {
    position: absolute;
    inset: 39% 36% 55% 49%;
  }

  .close {
    inset: 0% 85% 94% 2%;
    @extend %close;
  }
}
</style>
