<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Edit Item</h3>
      </div>
      <div class="card-body">
        <div class="alert alert-primary" role="alert" v-if="showAlert">
          {{ popUpDetails }}
        </div>
        <div
          class="alert alert-danger" role="alert" v-if="!showAlert && errroDetails !== ''">
          {{ errroDetails }}
        </div>
        <form v-on:submit.prevent="updateUser">
          <div class="form-group">
            <label>User Name:</label>
            <input type="text" class="form-control" v-model="name" />
          </div>
          <div class="form-group">
            <label>Job Role:</label>
            <input type="text" class="form-control" v-model="job" />
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Update User" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Edit",
  data() {
    return {
      name: "",
      job: "",
      popUpDetails: "",
      errroDetails:"",
      showAlert: false,
    };
  },
  methods: {
    updateUser() {
      axios
        .put(`https://reqres.in/api/users/${this.$route.params.id}`, {
          name: this.name,
          job: this.job,
        })
        .then((result) => {
          if (result.status === 200) {
            this.showAlert = true;
            this.popUpDetails = `Job updated Successfully at ${result.data.updatedAt} 
              Welcome!! ${result.data.name} as ${result.data.job} role`;
          }
        })
        .catch((err) => {
             this.showAlert = false;
           this.errroDetails = `failed to update"${err} ` ;
        });
    },
  },
  created() {
    axios
      .get(`https://reqres.in/api/users/${this.$route.params.id}`)
      .then((res) => {
        if (res.status === 200) {
          this.name = res.data.data.first_name;
        }
      })
      .catch((err) => {
           this.showAlert = false;
           this.errroDetails = `failed to get data to be updated "${err} ` ;
      });
  },
};
</script>

<style></style>
