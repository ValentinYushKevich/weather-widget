<template>
  <div class="settings-menu">
    <button class="menu__btn" @click="changeSettingsVisible" v-if="!settigsShow">
      <img svg-inline src="../assets/svg/optionsIcon.svg" alt="optionsIcon" />
    </button>

    <div class="menu__box" :class="{ show__settings: settigsShow }">
      <div class="menu__box__title">
        Settings
      </div>
      <button class="menu__btn__close" v-if="settigsShow" @click="settigsShow = !settigsShow">
        <img svg-inline src="../assets/svg/closeOptionsIcon.svg" alt="closeOptionsIcon" />
      </button>
      <SelectedCities :allTowns="allTowns" />

      <AddLocation :errorMessage="errorMessage" />
    </div>
  </div>
</template>

<script>
import AddLocation from "./AddLocation.vue";
import SelectedCities from "./SelectedCities.vue";
import { mapActions } from "pinia";
import { useTowns } from "../store/towns";

export default {
  components: {
    AddLocation,
    SelectedCities
  },
  props: {
    allTowns: {
      type: Array,
      require: true
    },
    errorMessage: {
      type: String
    }
  },

  data() {
    return {
      settigsShow: false
    };
  },

  methods: {
    ...mapActions(useTowns, ["clearError"]),
    changeSettingsVisible() {
      if (!this.settigsShow) this.clearError();
      this.settigsShow = !this.settigsShow;
    }
  }
};
</script>

<style scoped lang="scss">
.settings-menu {
  display: block;
}

.menu__btn,
.menu__btn__close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 3;
}

.menu__btn__close {
  top: 10px;
  right: 10px;
  z-index: 5;
}

.menu__btn__close svg {
  width: 20px;
  height: 20px;
}

.menu__box {
  display: block;
  position: absolute;
  visibility: hidden;
  box-sizing: border-box;
  top: -100%;
  left: 0;
  width: 258px;
  border-radius: 15px;
  border: 1px solid #00006f;
  margin: 0;
  padding: 10px 10px 25px;
  color: black;
  background-color: #fff;
  box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.2);
  transition-duration: 0.5s;
  z-index: 4;
  max-height: 580px;
  overflow-x: hidden;
  overflow-y: auto;
}

.show__settings {
  visibility: visible;
  top: 0;
}
</style>
