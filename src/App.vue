<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid" v-if="this.cart.length > 0">
        <a class="storeCart d-lg-flex"
          ><button v-on:click="navigateTo">
            {{ cartItems
            }}<font-awesome-icon icon="fa-solid fa-cart-shopping" /></button
        ></a>
      </div>
      <div class="container-fluid" v-else>
        <a class="storeCart d-lg-flex"
          ><button disabled>
            {{ cartItems
            }}<font-awesome-icon icon="fa-solid fa-cart-shopping" /></button
        ></a>
      </div>
    </nav>

    <!-- Search Feature -->
    <div id="searchBox">
      <input
        type="text"
        v-model="search"
        id="searchBar"
        placeholder="search for a lesson"
      />
    </div>
    <br />
    <!-- Sorting Options -->
    <section id="sortWrapper" class="mb-4">
      <p class="display-6" style="text-align: center" id="alignText">
        Sort according to
      </p>
      <div class="row mt-2">
        <div class="col">
          <input
            type="radio"
            id="subject"
            name="sortOption"
            value="subject"
            v-model="sortOption"
          />
          <label for="subject" class="lead">Subject</label>
        </div>

        <div class="col">
          <input
            type="radio"
            id="location"
            name="sortOption"
            value="location"
            v-model="sortOption"
          />
          <label for="location" class="lead">Location</label>
        </div>

        <div class="col">
          <input
            type="radio"
            id="price"
            name="sortOption"
            value="price"
            v-model="sortOption"
          />
          <label for="price" class="lead">Price</label>
        </div>

        <div class="col">
          <input
            type="radio"
            id="stock"
            name="sortOption"
            value="stock"
            v-model="sortOption"
          />
          <label for="stock" class="lead">Availability</label>
        </div>
      </div>
    </section>
    <!-- Ordering Options -->
    <section id="orderWrapper" class="mb-4">
      <p class="display-6" style="text-align: center" id="alignText">
        Order according to
      </p>
      <div class="row mt-2">
        <div class="col">
          <input
            type="radio"
            id="asc"
            name="orderBy"
            value="asc"
            v-model="orderOption"
          />
          <label for="asc" class="lead">Ascending order</label>
        </div>

        <div class="col">
          <input
            type="radio"
            id="desc"
            name="orderBy"
            value="desc"
            v-model="orderOption"
          />
          <label for="desc" class="lead">Descending order</label>
        </div>
      </div>
    </section>

    <main>
      <component
        :is="currentView"
        :filteredLessons="filteredLessons"
        :cart="cart"
        :baseURL="baseURL"
        @add-item-to-cart="addtocart"
        @remove-item-from-cart="removefromcart"
      ></component>
    </main>
  </div>
</template>

<script>
import Lesson from "./components/Lesson.vue";
import Checkout from "./components/Checkout.vue";

export default {
  name: "app",
  data() {
    return {
      currentView: Lesson,
      lessons: [],
      sorting: "price",
      cart: [],
      search: "",
      baseURL:
        "https://cst3145-env.eba-9sjt9wkg.eu-west-2.elasticbeanstalk.com",
      disabled: [true, true],
      sortOption: "",
      orderOption: "",
    };
  },
  components: {
    Lesson,
    Checkout,
  },

  created: function () {
    fetch(`${this.baseURL}/lessons`)
      .then((response) => response.json())
      .then((lessons) => {
        this.lessons = lessons;
      });
  },

  methods: {
    // Add lesson to cart
    addtocart(lesson) {
      --lesson.spaces;
      // find selected lesson in cart
      var lessonInCart = this.cart.find((u) => u.lessonId == lesson._id);

      // if lessonIncart is empty, add selected lesson to cart, otherwise update selected lesson spaces in cart
      if (lessonInCart != null) {
        ++lessonInCart.spaces;
      } else {
        lessonInCart = { lessonId: lesson._id, spaces: 1, lesson: lesson };
        this.cart.push(lessonInCart);
      }
    },
    // Remove lesson from cart
    removefromcart(id) {
      var itemInCart = this.cart.find((u) => u.lessonId == id);

      if (itemInCart.spaces == 1) {
        var index = this.cart.map((x) => x.lessonId).indexOf(id);
        this.cart.splice(index, 1);

        //when the cart is empty goes back to home page
        if (this.cart.length <= 0) {
          this.navigateTo();
        }
      } else {
        --itemInCart.spaces;
      }

      // update lesson space
      var lesson = this.lessons.find((u) => u._id == id);
      ++lesson.spaces;
    },
    // Switching Pages
    navigateTo() {
      if (this.currentView == Lesson) {
        this.currentView = Checkout;
      } else {
        this.currentView = Lesson;
      }
    },
  },
  // Number of lessons in the Cart
  computed: {
    cartItems: function () {
      return this.cart.length || "";
    },

    // Search and Sort
    filteredLessons() {
      // Sort Function
      this.lessons.sort((a, b) => {
        // Sorting according to subject
        if (this.sortOption == "subject") {
          let fa = a.topic.toLowerCase(),
            fb = b.topic.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }
        // Sorting according to location
        else if (this.sortOption == "location") {
          let fa = a.location.toLowerCase(),
            fb = b.location.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }
        // Sorting according to price
        else if (this.sortOption == "price") {
          return a.price - b.price;
        }
        // Sorting according to spaces
        else if (this.sortOption == "stock") {
          return a.spaces - b.spaces;
        }
      });

      // Sorting according to ascending/descending order
      if (this.orderOption === "desc") {
        this.lessons.reverse();
      }

      return this.lessons;
    },
  },
};
</script>
