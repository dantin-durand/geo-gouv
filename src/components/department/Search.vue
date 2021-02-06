<template>
  <ion-header translucent>
    <form @submit.prevent="">
      <ion-item>
        <ion-label>département</ion-label>
        <ion-select
          interface="action-sheet"
          cancel-text="Retour"
          v-model="inputDepartment"
          @ionChange="submitDepartment"
          class="select-department"
        >
          <ion-select-option
            v-for="department in departments"
            :key="department.code"
            :value="department.code"
            >{{ department.name }}</ion-select-option
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
  name: "SearchDepartment",
  components: {
    IonHeader,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
  },
  data() {
    return {
      inputDepartment: "",
      departments: [],
    };
  },
  mounted() {
    axios
      .get(`https://geo.api.gouv.fr/regions`)
      .then((response) => {
        for (const key in response.data) {
          axios
            .get(
              `https://geo.api.gouv.fr/regions/${response.data[key].code}/departements`
            )
            .then((response) => {
              for (const key in response.data) {
                const departementList = {
                  name: response.data[key].nom,
                  code: response.data[key].code,
                };
                this.departments.push(departementList);
                this.departments = this.departments.sort(this.compare);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
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
    submitDepartment() {
      console.log("changemeeeeent !!!", this.inputDepartment);
      axios
        .get(
          `https://geo.api.gouv.fr/departements/${this.inputDepartment}/communes`
        )
        .then((response) => {
          this.$bus.emit("sendResultDepartment", response.data);
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