<template>
  <ion-page>
    <HomeBody />
  </ion-page>
</template>

<script>
import { IonPage } from "@ionic/vue";
import HomeBody from "../components/Home";

export default {
  name: "Home",
  components: {
    IonPage,
    HomeBody,
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