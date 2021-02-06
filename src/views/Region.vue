<template>
  <ion-page>
    <SearchRegion />
    <ResultRegion />
  </ion-page>
</template>

<script>
import { IonPage } from "@ionic/vue";
import SearchRegion from "../components/region/Search";
import ResultRegion from "../components/region/Result";

export default {
  name: "Region",
  components: {
    IonPage,
    SearchRegion,
    ResultRegion,
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