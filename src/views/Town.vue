<template>
  <ion-page>
    <SearchTown />
    <ResultTown />
  </ion-page>
</template>

<script>
import { IonPage } from "@ionic/vue";
import SearchTown from "../components/town/Search";
import ResultTown from "../components/town/Result";

export default {
  name: "Town",
  components: {
    IonPage,
    SearchTown,
    ResultTown,
  },
};
</script>
<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>