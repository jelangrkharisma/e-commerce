<template>
  <div class="isSticky">
    <div class="card">
      <div class="card-body">
        <h5>Shopping Card</h5>
        <cartRow />
        <br>
        <hr class="my-2">
        <hr class="my-2">
        <div class="d-flex justify-content-between">
          <strong>Total: </strong>
          <div class="d-flex align-items-center">
            <strong>3680000 </strong>
            <button class="btn btn-info ml-3">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cartRow from '../components/CartRow'
export default {
  components: {
    cartRow
  }
}
</script>

<style>
.isSticky{
  position: sticky;
}
</style>
