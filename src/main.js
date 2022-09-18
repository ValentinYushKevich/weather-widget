import { createApp } from "vue";
import { createPinia } from "pinia";
import WeatherWidget from "./WeatherWidget.vue";
// import wrapper from "vue3-webcomponent-wrapper";

const pinia = createPinia();

const app = createApp(WeatherWidget).use(pinia);

app.mount("#app");
// const webComponent = wrapper(app, createApp, h);

// window.customElements.define("weather-widgwt", webComponent);
