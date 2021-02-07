<template>
  <ion-header>
    <div id="header-modal" class="ion-text-center title-container-modal">
      <button class="close-modal-btn" @click="closeModal()">
        <ion-icon :icon="chevronBack" />Retour
      </button>
      <div>
        <h1>
          <ion-icon :icon="location" /> <b>{{ name }}</b>
        </h1>
        <h5>{{ department.nom }} - {{ department.code }}</h5>
        <h5>{{ region.nom }}</h5>
      </div>
    </div>
  </ion-header>

  <ion-content
    class="ion-padding"
    :scroll-events="true"
    @ionScrollStart="logScrollingStart()"
    @ionScroll="logScrolling($event)"
  >
    <ion-grid>
      <ion-row>
        <ion-col class="card">
          <ion-card color="tertiary" class="ion-no-margin">
            <ion-card-content class="ion-text-center">
              <ion-icon :icon="man" class="icon-title-card" />

              <h1 class="ion-margin-bottom">
                <b>{{ inhabitant.toLocaleString() }}</b>
              </h1>
              <h2>Habitants</h2>
            </ion-card-content>
          </ion-card>
        </ion-col>
        <ion-col>
          <ion-card color="success" class="ion-no-margin">
            <ion-card-content class="ion-text-center">
              <ion-icon :icon="flag" class="icon-title-card" />

              <h1 class="ion-margin-bottom">
                <b>{{ areaInKm }} km²</b>
              </h1>
              <h2>Surface</h2>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <ion-card class="ion-no-margin">
            <ion-card-header color="primary" class="ion-margin-bottom">
              <h2
                class="ion-text-center ion-no-margin"
                v-if="postalCodes.length <= 1"
              >
                Code postal
              </h2>
              <h2 class="ion-text-center ion-no-margin" v-else>
                <b>Codes postaux</b>
              </h2>
            </ion-card-header>
            <ion-card-content class="ion-text-center">
              <ion-chip
                color="primary"
                v-for="postalCode in postalCodes"
                :key="postalCode"
              >
                <ion-label color="primary"
                  ><b>{{ postalCode }}</b></ion-label
                >
              </ion-chip>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCol,
  IonRow,
  IonLabel,
  IonChip,
  IonGrid,
  IonCardContent,
} from "@ionic/vue";
import { man, flag, location, chevronBack } from "ionicons/icons";

export default {
  components: {
    IonContent,
    IonHeader,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCol,
    IonRow,
    IonLabel,
    IonChip,
    IonGrid,
    IonCardContent,
  },
  name: "Modal",
  props: [
    "name",
    "inhabitant",
    "regionCode",
    "postalCodes",
    "closeModal",
    "department",
    "region",
    "area",
  ],
  data() {
    return {
      areaInKm: null,
    };
  },

  setup() {
    return {
      man,
      flag,
      location,
      chevronBack,
    };
  },

  methods: {
    logScrollingStart() {
      const headerModal = document.getElementById("header-modal");
      headerModal.classList.add("title-modal-onscroll");
    },
    logScrolling(e) {
      const headerModal = document.getElementById("header-modal");
      if (e.detail.scrollTop <= 0) {
        headerModal.classList.remove("title-modal-onscroll");
      }
    },
  },
  mounted() {
    const areaConvert = Number(this.area) / 100;
    this.areaInKm = areaConvert.toFixed(1);
  },
};
</script>
<style>
.close-modal-btn:active {
  outline: none;
}
.close-modal-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #ffffffe9;
  transition: all 0.4s ease-in-out;
  z-index: 5;
}
.title-container-modal {
  height: 30vh;
  background: linear-gradient(to top, #4481eb 0%, #04befe 100%);
  border-radius: 0px 0px 20px 20px;
  color: white;
  box-shadow: 0px 0px 15px #00000052;
  border: 2px solid #ffffff61;
  transition: all 0.4s ease-in-out;
}
.title-modal-onscroll {
  height: 50px !important;
  border-radius: 0px;
  background: linear-gradient(to top, #04befe 0%, #04befe 100%);
  border: 1px;
}
.title-modal-onscroll > .close-modal-btn {
  top: 15px;
}
.title-modal-onscroll > div > h1 {
  font-size: 16px;
  transition: all 0.4s ease-in-out;
}
.title-modal-onscroll > div > h5 {
  display: none;
}
.title-container-modal > div {
  position: relative; /* postulat de départ */
  top: 50%;
  left: 50%; /* à 50%/50% du parent référent */
  transform: translate(-50%, -50%);
}
.title-container-modal > div > h1 {
  margin-top: 0;
}
.icon-title-card {
  font-size: 40px;
}
</style>