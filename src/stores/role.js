import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import dataRole from "../dataRole.js";

export const useRoleStore = defineStore("role", () => {
  const role = reactive({
    dataRole,
    now: "knight", // default of role
    data: computed(() => role.dataRole[role.now]),
    background: computed(
      () => `url(src/assets/${role.now}/bg_${role.now}.png)`
    ),
  });

  return {
    role,
  };
});
