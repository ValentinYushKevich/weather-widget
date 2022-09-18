<template>
  <div class="add__location__wrapper">
    <label class="add__location__title">Add Location:</label>
    <input type="text" placeholder="Add Location" @keypress.enter="addNewTown" v-model="townTitle" />
    <span class="error__message">{{ error }}</span>
    <img svg-inline src="../assets/svg/plusIcon.svg" alt="plusIcon" @click="addNewTown" />
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useTowns } from "@/store/towns";

export default {
  props: {
    errorMessage: {
      type: String
    }
  },

  data() {
    return {
      townTitle: ""
    };
  },

  computed: {
    error() {
      return this.errorMessage.trim()
        ? this.errorMessage[0].toUpperCase() + this.errorMessage.slice(1)
        : "";
    }
  },

  methods: {
    ...mapActions(useTowns, ["addTown"]),
    addNewTown() {
      this.addTown(this.townTitle);
      this.townTitle = "";
    }
  }
};
</script>

<style scoped lang="scss">
.add__location__wrapper {
  font-size: 11px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.add__location__title {
  flex-basis: 100%;
}

.add__location__wrapper input {
  margin-top: 5px;
  border-radius: 5px;
  padding: 5px;
  outline: none;
  border: 1px solid blue;
  margin-right: 10px;
}

.add__location__wrapper input:focus {
  border: 1px solid green;
}

svg {
  width: 22px;
  height: 22px;
  margin-top: 5px;
  cursor: pointer;
}

.error__message {
  color: red;
  font-size: 12px;
  position: absolute;
  bottom: 10px;
}
</style>
