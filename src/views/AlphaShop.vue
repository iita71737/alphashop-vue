<template>
  <form id="main-form">
    <div class="form-container">
      <div class="form-order">
        <div class="step-panel" id="step-control">
          <h2>結帳</h2>
          <div class="step-wrapper">
            <div
              class="step"
              :class="{ checked: step > 0, active: step === 0 }"
            >
              <div class="circle-container"></div>
              <span>寄送地址</span>
            </div>
            <div class="connect-line"></div>
            <div
              class="step"
              :class="{ checked: step > 1, active: step === 1 }"
            >
              <div class="circle-container"></div>
              <span>運送方式</span>
            </div>
            <div class="connect-line"></div>
            <div
              class="step"
              :class="{ checked: step > 2, active: step === 2 }"
            >
              <div class="circle-container"></div>
              <span>付款資訊</span>
            </div>
          </div>
        </div>
        <FormStepOne
          :v-if="this.step == 0"
          :step="step"
          @after-filled-out="afterFilledOut"
          :form-data="formData"
        />
        <FormStepTwo
          :v-if="this.step == 1"
          :step="step"
          @after-selected-shippingway="childByValue"
          :form-data="formData"
        />
        <FormStepThree
          :v-if="this.step == 2"
          :step="step"
          @after-filled-creditcard="handleCreditCard"
          :form-data="formData"
        />
        <FinishedMessage :v-if="this.steproute > 3" :step="step" />
      </div>
      <Carts
        :cart-items="cartItems"
        :shipping-cost="shippingCost"
        :step="step"
        v-show="this.step < 3"
      />
    </div>

    <div id="btn-control" class="control-panel">
      <div class="button-wrapper">
        <button
          :class="{ 'd-none': isHidePrev }"
          class="btn-previus"
          @click.stop.prevent="handlePrev()"
        >
          <router-link :to="{ path: `step${steproute - 1}` }">
            <i class="far fa-long-arrow-left"></i> 上一步</router-link
          >
        </button>
        <button
          :class="{ 'd-none': isHideNext }"
          class="btn-next"
          @click.stop.prevent="handleNext()"
        >
          <router-link
            :to="{ path: `step${steproute + 1}`, params: { step: steproute } }"
          >
            下一步<i class="far fa-long-arrow-right"></i
          ></router-link>
        </button>

        <button
          v-if="step == 2"
          :class="{ 'd-none': hiddenNext }"
          class="btn-next"
          @click.stop.prevent="submitOrder()"
        >
          確認下單<i class="far fa-long-arrow-right"></i>
        </button>

        <b-button
          v-if="step == 3"
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
            <ul class="list-group" v-for="item in cartItems" :key="item.id">
              <li class="list-group-item">{{ item }}</li>
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
import FormStepOne from './../components/FormStepOne.vue'
import FormStepTwo from './../components/FormStepTwo.vue'
import FormStepThree from './../components/FormStepThree.vue'
import Carts from './../components/Carts.vue'
import FinishedMessage from './../components/FinishedMessage.vue'

const dummyCartItems = [
  {
    id: 5433,
    name: '破壞補丁修身牛仔褲',
    amount: 1,
    price: 3999,
    image: 'https://upload.cc/i1/2021/05/23/bpjY2a.jpg'
  },
  {
    id: 5434,
    name: '低腰直筒牛仔褲',
    amount: 2,
    price: 1299,
    image: 'https://upload.cc/i1/2021/05/23/t2dVMp.jpeg'
  }
]

const STORAGE_KEY = 'alphashop-app-vue'

export default {
  name: 'AlphaShop',
  components: {
    FormStepOne,
    FormStepTwo,
    FormStepThree,
    Carts,
    FinishedMessage
  },
  data () {
    return {
      cartItems: [],
      formData: '',
      step: 0,
      shippingCost: 0,
      hiddenPrev: true,
      hiddenNext: false,
      steproute: 1
    }
  },
  computed: {
    isHidePrev () {
      return this.step === 0
    },
    isHideNext () {
      return this.step >= 2
    }
  },

  methods: {
    fetchCartItems () {
      this.cartItems = { ...dummyCartItems }
    },
    handlePrev () {
      if (this.step > 0) {
        this.step = this.step - 1
        this.steproute = this.step + 1
        this.switchBtnStatus(this.step)
      }
    },
    handleNext () {
      if (this.step < 3) {
        this.step = this.step + 1
        this.steproute = this.step + 1
        this.switchBtnStatus(this.step)
      }
    },
    submitOrder () {
      this.step = this.step + 1
      this.steproute = this.step + 1
      this.switchBtnStatus(this.step)
    },
    saveStorage () {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.formData))
    },
    childByValue (childValue) {
      // childValue就是子元件傳過來的值
      this.shippingCost = Number(childValue)
      this.formData = { ...this.formData, shippingfee: this.shippingCost }
    },
    afterFilledOut (BIdata) {
      // childValue就是子元件傳過來的值
      this.formData = { ...BIdata }
    },
    handleCreditCard (data) {
      this.formData = { ...this.formData, data }
    }
  },
  created () {
    this.fetchCartItems()
    this.formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      sex: 'male',
      location: 'select'
    }
  },
  watch: {
    formData: {
      handler: function () {
        this.saveStorage()
      }
    },
    deep: true
  }
}
</script>
