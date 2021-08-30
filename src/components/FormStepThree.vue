<template>
            
          <div class="step-form" v-show="step==2" @change="handleUserCreditCard()">
            <h3 class="step-title">付款資訊</h3>
            <div class="step-row">
              <div class="name-row form-row">
                <label for="">持卡人姓名</label>
                <input v-model="cardData.cardname" type="text" id="card-name" placeholder="John Doe">
              </div>
            </div>
            <div class="step-row">
              <div class="cc-row form-row">
                <label for="cc-number">卡號</label>
                <input v-model="cardData.cardnumber" id="cc-number" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="1111 2222 3333 4444">
              </div>
            </div>
            <div class="step-row fullcard-row">
              <div class="cc-date-row form-row">
                <label for="cc-expires">有效期限</label>
                <input v-model="cardData.cardexp" id="cc-expires" type="tel" pattern="\d*" maxlength="7" placeholder="MM/YY">
              </div>
              <div class="cc-code-row form-row">
                <label for="cc-code">CVC / CCV</label>
                <input v-model="cardData.cardccv" id="cc-code" type="tel" pattern="\d*" maxlength="4" placeholder="123">
              </div>
            </div>
          </div>
</template>

<script>
export default {
    name:'stepThree',
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
            cardData: {
                cardname: '',
                cardnumber: '',
                cardexp: '',
                cardccv: '',
            }
        }
    },
    methods:{
        handleUserCreditCard(){
            this.$emit('after-filled-creditcard',this.cardData)
        },
        fetchData(){
          this.cardData = {...this.formData.data}
        }
    },
    created(){
      this.fetchData()
    }
}
</script>