<template lang="html">
  <div class="ui white fixed menu menu_wrapper">
    <div class="header item logo_container">
      <progressive-img
        src="https://storage.googleapis.com/crm-param-prod/company_logos/xJ7SxQtozx_param_logo_color.png?Expires=1562403285&GoogleAccessId=gsc-signed-read%40param-dev.iam.gserviceaccount.com&Signature=aPajaJO5lmVJLEfJ3xXPLjCuoAL90gD4rE93ox5yXzGg%2FgwoYybgJxwHfE20TL5cs1mX5TFmyDw2a9z2xH4OqmhFBgjuKV13BgrLN8p1%2FdL6hlURf6raZvTs3rdNmJV3bFVMlHvqTliCUK1zAfPUxSQpe7nuQv3jTeZTjrHLEuVR4OU4PzCK4OSJ9uLzlU%2FN1OnBMSGp7S711NZzrAOv6kCFKMU50FLZF15uqRs4xAgJSE497yaIvU5TAM7kjnmi2qEkn3vGyCXrDjCbFewoocNqayRigMCkR6iSBFFTaGZoFX4xEXyAwuoV0gmGHppvay9Sh9cj4M3Yg4oDV%2F1RIg%3D%3D"></progressive-img>
    </div>
    <a class="item active" href="/" style="color: rgb(0, 141, 234) !important;">Jobs</a>
    <template lang="html">
      <div class="buttons">
        <sui-button class-name="not-primary">Candidate Login</sui-button>
        <sui-button primary>Candidate Sign up</sui-button>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style lang="sass">
.menu_wrapper
  z-index: 100
  border: 1px solid #ececec
  background: #fff !important
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.08) !important
  border-radius: 0
  min-height: 60px
  .item
    &:before
      display: none !important

  .active
    margin: 0.9em 0.4em
    padding: 10px 18px
    border-radius: 59px !important

  .progressive-image-wrapper
    height: auto !important
    width: 133px !important
    padding-bottom: 0 !important

    img
      position: relative !important
      height: 100%
      width: 100%
      object-fit: contain
      border-radius: 3px

  .buttons
    display: flex
    width: 100%
    justify-content: flex-end
    margin: 10px
    button
      height: 40px
    .not-primary
      background-color: #fff !important
      border: 1.5px solid rgb(0, 141, 234) !important
      margin-right: 20px !important
      color: rgb(0, 141, 234) !important
</style>
