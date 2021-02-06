<template>
  <ion-page>
    <SearchDepartment />
    <ResultDepartment />
  </ion-page>
</template>

<script>
import { IonPage } from "@ionic/vue";
import SearchDepartment from "../components/department/Search";
import ResultDepartment from "../components/department/Result";

export default {
  name: "Department",
  components: {
    IonPage,
    SearchDepartment,
    ResultDepartment,
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