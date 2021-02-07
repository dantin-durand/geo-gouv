<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar>
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home" />
          <ion-label>Accueil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="communes" href="/communes">
          <ion-icon :icon="location" />
          <ion-label>Communes</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="departemant" href="/departements">
          <ion-icon :icon="flag" />
          <ion-label>département</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="region" href="/regions">
          <ion-icon :icon="map" />
          <ion-label>Région</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import { location, flag, map, home } from "ionicons/icons";

export default {
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      location,
      flag,
      map,
      home,
    };
  },
};
</script>
