<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by title"
            v-model="title"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchTitle"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Books List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(book, index) in books"
            :key="index"
            @click="setActiveBook(book, index)"
          >
            {{ book.title }}
          </li>
        </ul>
  
        <button class="m-3 btn btn-sm btn-danger" @click="removeAllBooks">
          Remove All
        </button>
      </div>
      <div class="col-md-6">
        <div v-if="currentBook">
          <h4>books</h4>
          <div>
            <label><strong>Title:</strong></label> {{ currentBook.title }}
          </div>
          <div>
            <label><strong>Description:</strong></label> {{ currentBook.description }}
          </div>
          <div>
            <label><strong>Status:</strong></label> {{ currentBook.published ? "Published" : "Pending" }}
          </div>
  
          <router-link :to="'/books/' + currentBook.id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a book...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BookDataService from "../services/BookDataService";
  
  export default {
    name: "books-list",
    data() {
      return {
        books: [],
        currentBook: null,
        currentIndex: -1,
        title: ""
      };
    },
    methods: {
      retrieveBooks() {
        BookDataService.getAll()
          .then(response => {
            this.books = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveBooks();
        this.currentBook = null;
        this.currentIndex = -1;
      },
  
      setActiveBook(book, index) {
        this.currentBook = book;
        this.currentIndex = book ? index : -1;
      },
  
      removeAllBooks() {
        BookDataService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchTitle() {
        BookDataService.findByTitle(this.title)
          .then(response => {
            this.books = response.data;
            this.setActiveBook(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveBooks();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>