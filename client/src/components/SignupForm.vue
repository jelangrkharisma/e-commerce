<template>
  <div class="">
    <div class="d-flex justify-content-between">
      <h2>Signup as a new members</h2>
      <div class="">
        a member? <a href="#">signin here</a>
      </div>
    </div>
    <form>
      <div class="form-group">
        <label >Full Name</label>
        <input type="text" required class="form-control">
      </div>
      <div class="form-group">
        <label >Email address</label>
        <input type="email"  required class="form-control">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input">
        <label class="form-check-label">cupcakes??</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
