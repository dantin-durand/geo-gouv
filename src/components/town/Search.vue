<template>
  <ion-header translucent>
    <form @submit.prevent="">
      <ion-searchbar
        class="search"
        v-model="inputTown"
        @ionChange="subtmitTown"
        placeholder="Code postal ou ville"
      ></ion-searchbar>
    </form>
  </ion-header>
</template>

<script>
import { IonHeader, IonSearchbar } from "@ionic/vue";
import axios from "axios";

export default {
  name: "SearchTown",
  components: {
    IonHeader,
    IonSearchbar,
  },
  data() {
    return {
      inputTown: "",
    };
  },
  mounted() {},
  methods: {
    subtmitTown() {
      const isNumber = /^[0-9]+$/;
      const isString = /^[a-zA-ZÀ-ÿ-. ]*$/;

      if (this.inputTown.match(isString)) {
        axios
          .get(
            `https://geo.api.gouv.fr/communes?nom=${this.inputTown}&fields=code,nom,departement,region,surface,codesPostaux,population,codeRegion,codeDepartement&limit=500`
          )
          .then((response) => {
            this.$bus.emit("sendResultTown", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.inputTown.match(isNumber) && this.inputTown.length == 5) {
        axios
          .get(
            `https://geo.api.gouv.fr/communes?codePostal=${this.inputTown}&fields=code,nom,departement,region,surface,codesPostaux,population,codeRegion,codeDepartement&limit=500`
          )
          .then((response) => {
            this.$bus.emit("sendResultTown", response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return;
      }
    },
  },
};
</script>
<style>
.search {
  padding-bottom: 0px;
}
</style>