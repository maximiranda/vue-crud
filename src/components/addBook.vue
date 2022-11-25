<template>
    <div class="submit-form">
      <div v-if="!submitted">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="book.title"
            name="title"
          />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <input
            class="form-control"
            id="description"
            required
            v-model="book.description"
            name="description"
          />
        </div>
  
        <button @click="saveBook" class="btn btn-success">Submit</button>
      </div>
  
      <div v-else>
        <h4>You submitted successfully!</h4>
        <button class="btn btn-success" @click="newBook">Add</button>
      </div>
    </div>
  </template>
  
  <script>
  import BookDataService from "../services/BookDataService";
  
  export default {
    name: "add-book",
    data() {
      return {
        book: {
          id: null,
          title: "",
          description: "",
          published: false
        },
        submitted: false
      };
    },
    methods: {
      saveBook() {
        var data = {
          title: this.book.title,
          description: this.book.description
        };
  
        BookDataService.create(data)
          .then(response => {
            this.book.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      newBook() {
        this.submitted = false;
        this.book = {};
      }
    }
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>