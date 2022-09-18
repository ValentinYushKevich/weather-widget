<template>
  <div class="selected__cities">
    <draggable :list="allTowns">
      <div class="select__citie__wrapper" v-for="town of allTowns" :key="town.id" :dragstart="false">
        <img class="drag__icon" svg-inline src="../assets/svg/dragIcon.svg" alt="dragIcon" />
        <p>{{ town.name }}, {{ town.sys.country }}</p>
        <button class="delete__citie" @click="deleteTown(town.name)">
          <img svg-inline src="../assets/svg/trashIcon.svg" alt="trashIcon" />
        </button>
      </div>
    </draggable>
  </div>
</template>

<script>
import { VueDraggableNext } from "vue-draggable-next";
import { mapActions } from "pinia";
import { useTowns } from "@/store/towns";

export default {
  components: {
    draggable: VueDraggableNext
  },
  
  props: {
    allTowns: {
      type: Array,
      require: true
    }
  },

  methods: {
    ...mapActions(useTowns, ["deleteTown"])
  }
};
</script>

<style lang="scss" scoped>
.selected__cities {
  padding: 20px 0 20px;
}

.select__citie__wrapper {
  margin-top: 20px;
  background-color: #edede9;
  padding: 10px 10px 10px 40px;
  position: relative;
  font-size: 18px;
  border-radius: 5px;
}

.select__citie__wrapper p {
  margin: 0;
}

.drag__icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  left: 5px;
  top: calc(50% - 12px);
}

.delete__citie {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  position: absolute;
  cursor: pointer;
  top: 8px;
  right: 4px;
}

.delete__citie svg {
  width: 25px;
  height: 25px;
}
</style>
