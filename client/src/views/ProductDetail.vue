<template>
  <div class="wrapper">
    <div class="card">
      <div class="d-flex">
        <img class="product-img" src="https://cdn.sallysbakingaddiction.com/wp-content/uploads/2018/09/chai-latte-cupcakes-600x900.jpg" alt="">
        <div class="p-3 d-flex flex-column justify-content-between">
          <div class="upper">
            <h4>Vanilla Cinnamon Cupcakes</h4>
            <hr class="my-2">
            <br>
            <strong>Price: </strong>300000<br>
            <strong>Stock: </strong>2
            <br>
            <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore eius distinctio tenetur, repellendus labore quis, eos cumque quisquam maxime neque tempore quasi ullam doloremque vel fugit! Maxime molestiae pariatur labore!</p> -->
          </div>

          <div class="under">
            <hr class="my-2">
            <strong>On your cart: </strong>1<br>
            <strong>Total: </strong>300000<br>
            <br>
            <i class="fa-btn fas fa-minus-circle text-info mr-2"></i>
            <div class="btn btn-info">add to cart</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.product-img{
  width: 300px;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
}
</style>
