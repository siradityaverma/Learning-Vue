<template lang="html">
  <div class="hero">
    <div class="hero-wrapper">
        <progressive-background src="https://storage.googleapis.com/crm-param-prod/company_banners/RvwL5KW6fP_bg.png?Expires=1562486595&GoogleAccessId=gsc-signed-read%40param-dev.iam.gserviceaccount.com&Signature=NEbgfy28yyf%2FsxLo7Xu8I69oZYPcqJpefVlLAiVkGYyZ9Es07rQSwIOQBXc3cC%2BcLdN3fekcBVTFPGZVjCFGJBnsBQLVskHq4d5YUd9tEyBq49t8eroEXPLwI6oGu3H%2FRcrw90AX1bwEJlvpY01YguT%2F2OLfnx0wxUaJ10bmo90CbTBWpBUy5Zf1eJafoT3FZ8MVBkg1OSsNWwsBQz1VNtTTNN4BseQEF%2FVCdKtnM%2BJWr7lhXGNE6f%2BOZD55EMpkwR4zwEq5HtIIqj%2BwtsRp0XqMhUhvQuW1Pfa5AcFvFHPVqrSYnfzQvlVNwpAIFKn5TAWwI7Bda01tnsFyIeoPkw%3D%3D">
        <div slot="content" slot-scope="{ visible }">
            <h1>Shape the Future of Entertainment</h1> 
        </div>
    </progressive-background>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hero'
};
</script>

<style lang="sass">
.hero
    min-height: 300px
    background-size: cover
    background-position: 50%
    padding: 60px 0 0
    background: #fff
    .hero-wrapper 
        height: 480px
        position: relative
        overflow: visible
        .progressive-background-slot
            h1
                font-size: 53px
                font-weight: 600
                text-shadow: 0 3px 1px rgba(0,0,0,.1)
                color: #fff
                margin-top: 130px
                text-align: center
</style>