<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Add Users</h3>
      </div>
      <div class="card-body">
        <div class="alert alert-primary" role="alert" v-if="showAlert">
          {{ popUpDetails }}
        </div>
         <div class="alert alert-danger" role="alert" v-if="!showAlert && errroDetails!=='' ">
          {{ errroDetails }}
        </div>
        <form v-on:submit.prevent="addUser">
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Name:</label>
            <div class="col-sm-10">
               <input type="text" class="form-control" v-model="name" />
               </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-3 col-form-label">Job Role:</label>
            <div class="col-sm-10">
               <input type="text" class="form-control" v-model="selectedJob">
                <span @click="getroles()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></span>
               </div>
          </div>
         <div id="jobDesc" v-if="showJobData" class="jobOptions">
           <p v-for="item of rolesList" :key="item.id" @click="getSelectedvalues(item)">
           {{item.name}}
           </p>
         </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Add User" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Create",
  data() {
    return {
      name: "",
      popUpDetails: "",
      errroDetails:"",
      showAlert: false,
      showJobData:false,
      selectedJob:''
    };
  },
  methods: {
    getroles(){
      this.showJobData = true;
      this.rolesList = [{'name':'UX Designer',id:1},{'name': 'Frontend Dev',id:2},
      {'name':'Devops Engineer',id:3},{'name':'Full Stack Dev',id:4}];
      
    },
    getSelectedvalues(item){
      this.selectedJob = item.name,
      this.showJobData = false
    },
    addUser() {
      axios
        .post("https://reqres.in/api/users", {
          name: this.name,
          job: this.selectedJob,
        })
        .then((result) => {
          if (result.status === 201) {
            this.showAlert = true;
            this.popUpDetails = `User added Successfully at ${result.data.createdAt} 
              Welcome!! ${result.data.name} as ${result.data.job} role with ID ${result.data.id} `  ;
          }
        }) 
        .catch((err) => {
           this.showAlert = false;
           this.errroDetails = err  ;
        });
    },
  },
};
</script>

<style>
.jobOptions{
   cursor: pointer;
    border: 2px solid;
    width: 201px;
}
    </style>
