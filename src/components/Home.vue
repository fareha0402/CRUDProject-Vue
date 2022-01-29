<template>
  <div>
    <div class="alert alert-primary" role="alert" v-if="showAlert">
      {{ popUpDetails }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="!showAlert && errroDetails!==''">
      {{ popUpDetails }}
    </div>
    <h1>Users</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>first_name</td>
          <td>last_name</td>
          <td></td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in UserList" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>
            <img
              :src="item.avatar"
              alt=""
              border="2"
              height="100"
              width="100"
            />
          </td>
          <td>
            <router-link
              :to="{ name: 'Edit', params: { id: item.id } }"
              class="btn btn-primary"
              >Edit</router-link
            >
          </td>
          <td>
            <button class="btn btn-danger" @click="deleteUser(item.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      UserList: [],
      popUpDetails: "",
       errroDetails:"",
      showAlert: false,
    };
  },
  methods: {
    deleteUser(id) {
      axios
        .delete(`https://reqres.in/api/users/${id}`)
        .then((result) => {
          if (result.status === 204) {
            this.showAlert = true;
            this.popUpDetails = `Deletion Successfully for ID ${id}`;
          }
        })
        .catch((err) => {
            this.showAlert = false;
           this.errroDetails = `failed to delete ${err}`  ;
        });
    },
  },
  created() {
    axios
      .get("https://reqres.in/api/users")
      .then((result) => {
        if (result.status === 200) {
          this.UserList = result.data.data;
        }
      })
      .catch((err) => {
           this.showAlert = false;
           this.errroDetails = `failed to get list"${err}`  ;
      });
  },
};
</script>

<style></style>
