<template>
  <div class="card">
    <h3 class="card__title">{{ town.name }}, {{ town.sys.country }}</h3>
    <div class="card__temperature">
      <img svg-inline src="../assets/svg/cloud.svg" alt="cloud" />
      <span class="card__temperature"> {{ temperature }} ℃</span>
    </div>
    <div class="card__description">
      Fell like {{ feelsLike }} ℃. {{ description }}
    </div>
    <div class="more__information">
      <div class="wind__speed">
        <img svg-inline src="../assets/svg/windRotate.svg" alt="windRotate" />
        <span>{{ town.wind.speed }}m/s {{ windDirection }}</span>
      </div>
      <div class="pressure">
        <img svg-inline src="../assets/svg/pressure.svg" alt="pressure" />
        <span>{{ town.main.pressure }} hPA</span>
      </div>
      <div class="humidity">
        Humidity: <span>{{ town.main.humidity }}%</span>
      </div>
      <div class="dew__points">
        Dew points: <span>{{ dewPoint }} ℃</span>
      </div>
      <div class="visibility">
        Visibility: <span>{{ town.visibility / 1000 }} km</span>
      </div>
    </div>
  </div>
</template>

<script>
import { dewPoint } from "../utils/dewPoint";
import { temperatureRounding } from "../utils/temperatureRounding";

export default {
  name: "TownCard",
  props: {
    town: {
      type: Object,
      require: true
    }
  },
  computed: {
    temperature() {
      return temperatureRounding(this.town.main.temp);
    },
    feelsLike() {
      return temperatureRounding(this.town.main.feels_like);
    },
    description() {
      let str = this.town.weather[0].description;
      return str[0].toUpperCase() + str.slice(1);
    },
    windRotate() {
      return { transform: "rotate(" + this.town.wind.deg + "deg)" };
    },
    windDirection() {
      const deg = this.town.wind.deg || 0;
      if (deg > 15 && deg < 75) return "NE";
      if (deg > 75 && deg < 105) return "E";
      if (deg > 105 && deg < 165) return "SE";
      if (deg > 165 && deg < 195) return "S";
      if (deg > 195 && deg < 255) return "SW";
      if (deg > 255 && deg < 285) return "W";
      if (deg > 285 && deg < 345) return "NW";
      return "N";
    },
    dewPoint() {
      const humidity = this.town.main.humidity;
      // формула расчета точки росы
      return Math.round(
        (237.7 * dewPoint(this.temperature, humidity)) /
        (17.27 - dewPoint(this.temperature, humidity))
      );
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: normal;
  line-height: 20px;
  padding: 20px 0;
}

.card__title {
  padding: 5px;
  margin: 0;
}

.card__temperature {
  font-weight: bold;
  font-size: 30px;
  line-height: 30px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 20px;
  }
}

.card__description {
  padding: 25px 0;
}

.more__information {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.wind__speed,
.pressure,
.humidity,
.dew__points,
.visibility {
  flex-basis: 50%;
  padding: 5px 0;
}

.visibility {
  flex-grow: 1;
}

.wind__speed,
.pressure {
  flex-basis: 38%;
  padding-left: 25px;
  position: relative;
}

.wind__speed svg,
.pressure svg {
  width: 18px;
  height: 18px;
  position: absolute;
  left: 0;
  fill: white;
}

.wind__speed svg {
  transform: rotate(-47deg);
}
</style>
