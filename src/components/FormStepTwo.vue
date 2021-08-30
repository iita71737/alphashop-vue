<template>
              <div class="step-form" 
              v-show="step==1">
            <h3 class="step-title">運送方式</h3>
            <div class="step-row shipping-row" id="shipping-Options">
              <div class="shipping-way">
                <input id="standard" type="radio" name="shipping" value=0 v-model="shippingfee" @change="handleShippingfee()">
                <label class="ship-item" for="standard">
                  <div class="circle-icon"></div>
                  <div class="shipping-type">
                    <p class="shipping-title">標準運送</p>
                    <p class="shipping-time">約3~7工作天</p>
                  </div>
                  <div class="shipping-fee">免費</div>
                </label>
              </div>
              <div class="shipping-way">
                <input id="DHL" type="radio" name="shipping" value=500
                v-model="shippingfee"
                @change="handleShippingfee()"
                >
                <label class="ship-item" for="DHL">
                  <div class="circle-icon"></div>
                  <div class="shipping-type">
                    <p class="shipping-title">DHL貨運</p>
                    <p class="shipping-time">48小時內送達</p>
                  </div>
                  <div class="shipping-fee">$500</div>
                </label>
              </div>
            </div>
          </div>
</template>

<script>
export default {
    name:'stepTwo',
    props:{
        step :{
            type:Number,
            required: true
        },
        formData: {
          type:Object
        }
    },
    data(){
        return{
            shippingfee:0,
        }
    },
    methods:{
        handleShippingfee() {
            this.$emit('after-selected-shippingway', this.shippingfee)
        },
        fetchData(){
          this.shippingfee = this.formData.shippingfee
        }
    },
    created(){
      this.fetchData()
    }
}
</script>