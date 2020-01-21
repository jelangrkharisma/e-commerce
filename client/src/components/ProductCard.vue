<template>
  <div class="img-container">
    <div class="product-card img-thumbnail">
      <div class="img-wrapper">
        <img class="product-img" src="https://cdn.sallysbakingaddiction.com/wp-content/uploads/2018/09/chai-latte-cupcakes-600x900.jpg" alt="">

        <div class="caption">
          <div class="button-row d-flex align-items-center">
            <i class="fa-btn fas fa-minus-circle text-info mr-2"></i>
            <button class="btn btn-info btn-lg">Add to Cart <span class="badge badge-light text-info">4</span></button>
          </div>
          <a>Cinnamon Cupcake</a>
          <small>Rp.350000</small>
          <u><a class="readmore" href=#>more info</a></u>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
a.readmore{
  text-transform: lowercase;
  color: black;
  font-size: 0.6em
}
.img-container{
  margin:0.5em;
}
.product-img{
  width: 300px;
  height: 480px;
  object-fit: cover;
  box-sizing: border-box;
}
.img-wrapper{
  position: relative;
}
.caption {
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
  text-transform: capitalize;
  position: absolute;
  bottom: 20%;
  left: 0;
  background-color: rgba(255,255,255,0.78);
  padding-top: 0.5em;
  padding-bottom: 1em;
  padding-left: 0.5em;
  padding-right: 2em;
}
.button-row{
  position: absolute;
  bottom: -18%;
  right: 0%;
}
.fa-btn{
  cursor: pointer;
}
</style>
