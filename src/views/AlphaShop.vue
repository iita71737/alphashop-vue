<template>
  <form id="main-form">
    <div class="form-container">
      <div class="form-order">
        <div class="step-panel" id="step-control">
          <h2>結帳</h2>
          <div class="step-wrapper">
            <div
              class="step"
              :class="{ checked: stepOneCheck, active: stepOne }"
            >
              <div class="circle-container"></div>
              <span>寄送地址</span>
            </div>
            <div class="connect-line"></div>
            <div
              class="step"
              :class="{ checked: stepTwoCheck, active: stepTwo }"
            >
              <div class="circle-container"></div>
              <span>運送方式</span>
            </div>
            <div class="connect-line"></div>
            <div
              class="step"
              :class="{ checked: stepThreeCheck, active: stepThree }"
            >
              <div class="circle-container"></div>
              <span>付款資訊</span>
            </div>
          </div>
        </div>
        <FormStepOne :v-if="this.step == 0" :step="step" @after-filled-out="afterFilledOut" :form-data="formdata"/>
        <FormStepTwo
          :v-if="this.step == 1"
          :step="step"
          @after-selected-shippingway="childByValue"
          :form-data="formdata"
        />
        <FormStepThree :v-if="this.step == 2" :step="step" @after-filled-creditcard="handleCreditCard" :form-data="formdata"/>
        <FinishedMessage :v-if="this.steproute > 3" :step="step"/>
      </div>
      <Carts :cart-items="cartitems" :shipping-cost="shippingCost" :step="step" v-show="this.step<3"/>
    </div>

    <div id="btn-control" class="control-panel">
      <div class="button-wrapper">
        <button
          v-if="step < 3"
          :class="{ 'd-none': hiddenPrev }"
          class="btn-previus"
          @click.stop.prevent="handlePrev()"
        >
        <router-link :to="{ path: `step${steproute-1}` }">
          <i class="far fa-long-arrow-left"></i> 上一步</router-link>
        </button>
        <button
          v-if="step < 2"
          :class="{ 'd-none': hiddenNext }"
          class="btn-next"
          @click.stop.prevent="handleNext()"
        > 
        <router-link :to="{ path: `step${steproute+1}`, params:{ step:steproute } }">
          下一步<i class="far fa-long-arrow-right"></i></router-link>
        </button>
  
        <button
          v-else-if="step == 2"
          :class="{ 'd-none': hiddenNext }"
          class="btn-next"
          @click.stop.prevent="submitOrder()"
        >
          確認下單<i class="far fa-long-arrow-right"></i>
        </button>
        <b-button
          v-else-if="step > 2"
          :class="{ 'd-none': hiddenNext }"
          class="btn-next"
          v-b-modal.modal-1
        >
          顯示已完成訂單<i class="far fa-long-arrow-right"></i>
        </b-button>
        
        <b-modal
          id="modal-1"
          centered
          title="BootstrapVue"
          hide-footer
          hide-header
        >
          <div>
            <ul class="list-group" v-for="item in cartitems" :key="item.id">
              <li class="list-group-item">{{item}}</li>
            </ul>
          </div>
        </b-modal>
        <div class="empty-div"></div>
      </div>
      <div class="right-div"></div>
    </div>
  </form>
</template>

<script>
import FormStepOne from "./../components/FormStepOne.vue";
import FormStepTwo from "./../components/FormStepTwo.vue";
import FormStepThree from "./../components/FormStepThree.vue";
import Carts from "./../components/Carts.vue";
import FinishedMessage from './../components/FinishedMessage.vue'

const dummyCartitems = [
  {
    id: 5433,
    name: "破壞補丁修身牛仔褲",
    amount: 1,
    price: 3999,
    image: "https://upload.cc/i1/2021/05/23/bpjY2a.jpg",
  },
  {
    id: 5434,
    name: "低腰直筒牛仔褲",
    amount: 2,
    price: 1299,
    image: "https://upload.cc/i1/2021/05/23/t2dVMp.jpeg",
  },
];

const STORAGE_KEY = 'alphashop-app-vue'

export default {
  name: "AlphaShop",
  components: {
    FormStepOne,
    FormStepTwo,
    FormStepThree,
    Carts,
    FinishedMessage,
  },
  data() {
    return {
      cartitems: [],
      formdata: '',
      step: 0,
      shippingCost: 0,
      hiddenPrev: true,
      hiddenNext: false,
      stepOne: true,
      stepOneCheck: false,
      stepTwo: false,
      stepTwoCheck: false,
      stepThree: false,
      stepThreeCheck: false,
      steproute:1
    };
  },
  methods: {
    fetchCartItems() {
      this.cartitems = { ...dummyCartitems };
    },
    handlePrev() {
      if(this.step > 0 ){
      this.step = this.step - 1;
      this.steproute = this.step +1
      this.switchBtnStatus(this.step);
      }
    },
    handleNext() {
      if(this.step < 3 ){
      this.step = this.step + 1;
      this.steproute = this.step +1
      this.switchBtnStatus(this.step);
      }
    },
    switchBtnStatus(currentStep) {
      switch (currentStep) {
        case 0:
          this.hiddenPrev = true;
          this.stepOne = true;
          this.stepOneCheck = false;
          this.stepTwo = false;
          this.stepTwoCheck = false;
          this.stepThree = false;
          this.stepThreeCheck = false;
          this.step = currentStep;
          break;
        case 1:
          this.hiddenPrev = false;
          this.stepOne = false;
          this.stepOneCheck = true;
          this.stepTwo = true;
          this.stepTwoCheck = false;
          this.stepThree = false;
          this.stepThreeCheck = false;
          this.step = currentStep;
          break;
        case 2:
          this.hiddenPrev = false;
          this.stepOne = true;
          this.stepOneCheck = true;
          this.stepTwo = true;
          this.stepTwoCheck = true;
          this.stepThree = true;
          this.stepThreeCheck = false;
          this.step = currentStep;
          break;
        case 3:
          this.hiddenPrev = false;
          this.stepOne = true;
          this.stepOneCheck = true;
          this.stepTwo = true;
          this.stepTwoCheck = true;
          this.stepThree = true;
          this.stepThreeCheck = true;
      }
    },
    submitOrder() {
      this.step = this.step + 1;
      this.steproute = this.step +1
      this.saveStorage()
      this.switchBtnStatus(this.step);
    },
     saveStorage() {
    console.log('saveStorage')  //測試完可刪
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.formdata))
  },
    childByValue(childValue) {
      // childValue就是子元件傳過來的值
      this.shippingCost = Number(childValue);
      this.formdata = { ...this.formdata , shippingfee :this.shippingCost }
    },
    afterFilledOut(BIdata) {
      // childValue就是子元件傳過來的值
      this.formdata = {...BIdata}
    },
    handleCreditCard(data){
      this.formdata = {...this.formdata, data}
    }
  },
  created() {
    this.fetchCartItems();
    this.formdata = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  },
  watch: {
    formdata: {
      handler: function () {
          console.log('saveToStorage')
          this.saveStorage()
      }
    },
    deep: true
  }
};
</script>
