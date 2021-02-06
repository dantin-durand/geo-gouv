<template>
  <ion-content :fullscreen="true">
    <div id="container">
      <strong v-if="departments.length <= 0">Aucun résultats</strong>
    </div>
    <div v-if="departments.length >= 1">
      <p v-if="departments.length === 1" class="ion-margin-start result-number">
        {{ departments.length }} Résultat
      </p>
      <p v-if="departments.length > 1" class="ion-margin-start result-number">
        {{ departments.length }} Résultats
      </p>

      <ion-card
        v-for="department in departments"
        :key="department.nom"
        class="card-department"
      >
        <ion-card-header>
          <h5 class="town-title">
            <b>{{ department.nom }}</b>
          </h5>
        </ion-card-header>
      </ion-card>
    </div>
  </ion-content>
</template>

<script>
import { IonContent, IonCard, IonCardHeader } from "@ionic/vue";

export default {
  name: "ResultRegion",
  components: {
    IonContent,
    IonCard,
    IonCardHeader,
  },
  data() {
    return {
      departments: [],
      modal: null,
    };
  },
  mounted() {
    this.$bus.on("sendResultRegion", (result) => {
      console.log(result);
      this.departments = result;
    });
  },
  methods: {},
};
</script>

<style scoped>
.town-title {
  margin: 0;
  text-align: center;
}
.town-content {
  --background: #f0f1f2;
  --color: #969696;
}
.card-department {
  --background: linear-gradient(to left, #4481eb 0%, #04befe 100%);
  --color: #fff;
}
.result-number {
  font-size: 14px;
  color: #000000a3;
}
</style>