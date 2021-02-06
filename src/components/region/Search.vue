<template>
  <ion-header translucent>
    <form @submit.prevent="">
      <ion-item>
        <ion-label>Région</ion-label>
        <ion-select
          interface="action-sheet"
          cancel-text="Retour"
          v-model="inputRegion"
          @ionChange="submitRegion"
          class="select-region"
        >
          <ion-select-option
            v-for="region in regions"
            :key="region.code"
            :value="region.code"
            >{{ region.nom }}</ion-select-option
          >
        </ion-select>
      </ion-item>
    </form>
  </ion-header>
</template>

<script>
import {
  IonHeader,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
} from "@ionic/vue";
import axios from "axios";

export default {
  name: "SearchRegion",
  components: {
    IonHeader,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
  },
  data() {
    return {
      inputRegion: "",
      regions: [],
    };
  },
  mounted() {
    axios
      .get(`https://geo.api.gouv.fr/regions`)
      .then((response) => {
        this.regions = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    compare(firstElement, secondElement) {
      const firstRegionName = firstElement.name.toUpperCase();
      const secondRegionName = secondElement.name.toUpperCase();
      let comparison = 0;
      if (firstRegionName > secondRegionName) {
        comparison = 1;
      } else if (firstRegionName < secondRegionName) {
        comparison = -1;
      }
      return comparison;
    },
    submitRegion() {
      axios
        .get(`https://geo.api.gouv.fr/regions/${this.inputRegion}/departements`)
        .then((response) => {
          this.$bus.emit("sendResultRegion", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
ion-select {
  width: 100%;
  justify-content: center;
}
.header-background {
  border-radius: 0 0 10px 10px;
}
ion-item {
  --inner-border-width: 0px;
  border: 1px solid #00000021;
  border-radius: 10px;
  margin: 15px 15px;
}
</style>