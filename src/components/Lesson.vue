<template>
  <div class="row g-4">
    <div
      class="content col-md-3 col-sm-4"
      v-for="lesson in filteredLessons"
      :key="lesson.id"
    >
      <div class="lessonForm">
        
          <img
            v-bind:src="baseURL + '/' + lesson.imageURL"
            style="height: 300px"
          />
        <p><font-awesome-icon v-bind:icon="lesson.icon" /></p>
        <div class="content mt-4 mb-2">
          <p><strong>Subject: </strong>{{ lesson.topic }}</p>
          <p><strong>Location: </strong>{{ lesson.location }}</p>
          <p><strong>Price: </strong>£{{ lesson.price }}.00</p>
          <p><strong>Stock: </strong>{{ lesson.spaces }}</p>
        </div>
        <!-- Add to Cart Button -->
        <div class="button" v-if="canaddtocart(lesson)">
          <button
            class="btn btn-outline-success"
            id="add"
            v-on:click="addtocart(lesson)"
          >
            Add to Cart
          </button>
        </div>
        <div class="button" v-else>
          <button class="btn btn-outline-success" id="add" disabled>
            Out of Stock
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  props: ["filteredLessons", "baseURL", "cart"],
  methods: {
    canaddtocart(lesson) {
      return lesson.spaces > this.cartSpace(lesson);
    },
    // Lesson Cart Count
    cartSpace(lesson) {
      let x = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] == lesson) {
          x++;
        }
      }
      return x;
    },
    addtocart: function (lesson) {
      this.$emit("add-item-to-cart", lesson);
    },
  },
};
</script>
