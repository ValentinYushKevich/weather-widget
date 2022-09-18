<template>
  <div class="vidget__wrapper">
    <TownCard v-for="town of allTowns" :key="town.id" :town="town" />
    <WidgetEmpty v-if="!allTowns.length" />
    <Settings :allTowns="allTowns" :errorMessage="errorMessage" />
  </div>
</template>

<script>
import TownCard from "./components/TownCard.vue";
import Settings from "./components/Settings.vue";
import WidgetEmpty from "./components/WidgetEmpty.vue";
import { mapState, mapActions } from "pinia";
import { useTowns } from "../src/store/towns";

export default {
  name: "WeatherWidget",
  components: {
    TownCard,
    Settings,
    WidgetEmpty
  },

  mounted() {
    this.checkLoacalTowns();
  },

  computed: {
    ...mapState(useTowns, ["allTowns", "errorMessage"])
  },

  methods: {
    ...mapActions(useTowns, ["checkLoacalTowns"])
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  color: white;
  font-weight: normal;
  position: fixed;
  top: 20px;
  right: 20px;
  border-radius: 15px;
  width: 258px;
  background: #00006f;
  box-sizing: border-box;

  overflow: hidden;
}

.vidget__wrapper {
  min-height: 100%;
  overflow: auto;
  padding: 0 20px;
  box-sizing: border-box;
  width: 270px;
  max-height: 580px;
}
</style>
