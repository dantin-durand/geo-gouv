<template>
  <ion-content :fullscreen="true">
    <div id="container">
      <strong v-if="towns.length <= 0">Aucun résultats</strong>
    </div>
    <div v-if="towns.length >= 1">
      <p v-if="towns.length === 1" class="ion-margin-start result-number">
        {{ towns.length }} Résultat
      </p>
      <p v-if="towns.length > 1" class="ion-margin-start result-number">
        {{ towns.length }} Résultats
      </p>
      <ion-card class="card-container" v-for="town in towns" :key="town.nom">
        <ion-card-header class="card-title">
          <h2 class="town-title">
            {{ town.nom }}
          </h2>
        </ion-card-header>
        <ion-item
          href="#"
          @click.prevent="openModal(town)"
          class="town-content"
        >
          <ion-label><b>en savoir plus</b></ion-label>
        </ion-item>
      </ion-card>
    </div>
  </ion-content>
</template>

<script>
import {
  IonContent,
  modalController,
  IonCard,
  IonCardHeader,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import Modal from "./Modal";

export default {
  name: "ResultTown",
  components: {
    IonContent,
    IonCard,
    IonCardHeader,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      towns: [],
      modal: null,
    };
  },
  mounted() {
    this.$bus.on("sendResultTown", (result) => {
      this.towns = result;
    });
  },
  methods: {
    async createModal(town) {
      this.modal = await modalController.create({
        component: Modal,
        //cssClass: "my-custom-class",
        componentProps: {
          name: town.nom,
          inhabitant: town.population,
          regionCode: town.codeRegion,
          postalCodes: town.codesPostaux,
          department: town.departement,
          region: town.region,
          area: town.surface,
          closeModal: () => this.closeModal(),
        },
      });
    },
    async openModal(town) {
      await this.createModal(town);
      this.modal.present();
    },
    closeModal() {
      this.modal.dismiss();
    },
  },
};
</script>

<style scoped>
.town-title {
  margin: 0;
  text-align: center;
}
.town-content {
  --background: linear-gradient(to left, #4481eb 0%, #04befe 100%);
  --color: #fff;
}

.card-container {
  --background: linear-gradient(to left, #4481eb 0%, #04befe 100%);
  box-shadow: 0px 0px 12px #00000042;
}
.card-title {
  --background: #fff;
  border-radius: 0 0 5px 5px;
}
.result-number {
  font-size: 14px;
  color: #000000a3;
}
</style>