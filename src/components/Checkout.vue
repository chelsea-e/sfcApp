<template>
        <section id="section">
        <div class="container">
          <br />
          <!-- Content of Lessons Purchased -->
          <div class="row g-4">
            <div class="col-md-3 col-sm-4" v-for="lesson in cart">
              <div class="content lessonForm">
                  <img v-bind:src="baseURL + '/' + lesson.lesson.imageURL" style="height: 300px" />
                <p><i v-bind:class="lesson.icon"></i></p>
                <div class="content mt-4 mb-2">
                  <p><strong>Subject: </strong>{{lesson.lesson.topic}}</p>
                  <p><strong>Location: </strong>{{lesson.lesson.location}}</p>
                  <p><strong>Price: </strong>£{{lesson.lesson.price}}.00</p>
                  <p><strong>Stock: </strong>{{ lesson.spaces }}</p>
                </div>
                <!-- Remove from Cart Button -->
                <div class="button">
                  <button class="btn btn-outline-success" id="add" v-on:click="removefromcart(lesson.lesson._id)">
                    Reverse order
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br /><br /><br />

          <!-- Checkout Validation -->
          <div class="user-details col-lg-12 col-sm-6" style="text-align: center;">
            <form id="checkoutForm">
              <span><strong>Fill in the details below correctly</strong></span>
              <div class="input-box mb-4">
                <input v-model="name" type="text" class="form-control" id="name" aria-describedby="name"
                  placeholder="Please enter your name">
              </div>

              <div class="input-box mb-4">
                <input v-model="phone" type="tel" class="form-control" id="phone" aria-describedby="phone"
                  placeholder="Please enter your phone number">
              </div>
              <br /><br />
              <button type="submit" class="btn" :disabled="!enableCheckoutButton" v-on:click="showMessage">Checkout</button>
              
            </form>
          </div>
          <br />
        </div>
      </section>
</template>

<script>
export default{
  name: "app",
  data(){
    return{
      name: "",
    phone: "",
    }
  },
  props: ["filteredLessons", "baseURL", "cart"],
  methods:{
 // validate name
 validateNameInput() {
      let result = /^[a-zA-Z]+$/.test(this.name);
      return result;
    },
    // validate phone
    validatePhoneInput() {
      let result = /^\d+$/.test(this.phone);
      return result;
    },
    // removes a lesson from cart
    removefromcart(lesson) {
        this.$emit("remove-item-from-cart", lesson)
    },
    showMessage() {
      alert("Your order has been Submitted");
    },
  },
  computed: {
   
    enableCheckoutButton: function () {
      var nameIsValid = this.validateNameInput();
      var phoneIsValid = this.validatePhoneInput();

      if (nameIsValid && phoneIsValid) {
        return true;
      }
      return false
    }
  },
}
</script>