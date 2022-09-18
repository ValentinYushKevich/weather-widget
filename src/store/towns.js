import { defineStore } from "pinia";
import { fetchData } from "../utils/fetchData";

export const useTowns = defineStore("town", {
  state() {
    return {
      allTowns: [],
      errorMessage: "",
    };
  },
  actions: {
    async checkLoacalTowns() {
      const localData = localStorage.getItem("wWidget");
      if (localData) {
        const localTowns = JSON.parse(localData).map((town) => fetchData(town));
        this.allTowns = await Promise.all(localTowns);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Текущие координаты.
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          //Получаем по координатам город
          const currentTownName = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=cce21e0b-bdeb-4cd1-9e27-ceee4072b7c6&format=json&kind=locality&geocode=${lng},${lat}`
          ).then((response) => response.json());

          //Получаем погоду в городе
          const currentTown = await fetchData(
            currentTownName.response.GeoObjectCollection.featureMember[0]
              .GeoObject.name
          );
          this.allTowns.push(currentTown);
          localStorage.setItem("wWidget", JSON.stringify([currentTown.name]));
        },
        (error) => console.log("Error:", error)
      );
    },
    deleteTown(townName) {
      this.allTowns = this.allTowns.filter((town) => town.name !== townName);
      if (!this.allTowns.length) {
        localStorage.removeItem("wWidget");
        return;
      }
      localStorage.setItem(
        "wWidget",
        JSON.stringify(this.allTowns.map((town) => town.name))
      );
    },
    async addTown(title) {
      const newTown = await fetchData(title);
      if (newTown.cod === "404") {
        this.errorMessage = newTown.message;
        return;
      }
      if (newTown.id) {
        const localTowns = JSON.parse(localStorage.getItem("wWidget")) || [];

        if (localTowns.indexOf(newTown.name) > -1)
          return (this.errorMessage = "This city has already been added");

        localTowns.push(newTown.name);
        localStorage.setItem("wWidget", JSON.stringify(localTowns));
        this.allTowns.push(newTown);
        this.errorMessage = "";
      }
    },
    clearError() {
      this.errorMessage = "";
    },
  },
});
