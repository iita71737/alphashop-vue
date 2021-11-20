<template >
  <div class="form-cart" id="cart-order" >
    <h4 class="cart-title">購物籃</h4>
    <div class="cart" id="cart">
      <!--  cart items to be redered  -->
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" alt="itempic" />
        <div class="item-info">
          <div class="item-info-left">
            <span class="item-title">{{ item.name }}</span>
            <div class="item-quantity" id="item.id">
              <div class="minus" @click="changeMoney(item, -1)">
                <i class="fas fa-minus"></i>
              </div>
              <div class="item-amount">{{ item.amount }}</div>
              <div class="plus"  @click="changeMoney(item,1)">
                  <i class="fas fa-plus"></i>
                  </div>
            </div>
          </div>
          <div class="item-info-right">
            <span class="total-amount">${{ item.price*item.amount }}</span>
             <span class="single-price">單價{{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-shipping-charge">
      <span>運費</span>
      <span id="shipping-fee">${{ this.shippingCost}}</span>
    </div>
    <div class="cart-total-charge">
      <span>小計</span>
      <strong>$ {{totalMoney + this.shippingCost}} <span id="total-charge"></span></strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carts',
  props: {
    cartItems: {
      type: Object,
      required: true
    },
    shippingCost: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      carts: [],
      totalMoney: 0
    }
  },
  methods: {
    fetchCarts () {
      this.carts = { ...this.cartItems }
    },
    changeMoney (item, way) {
      if (way > 0) {
        item.amount++
      } else {
        item.amount--
        if (item.amount < 1) { // 限制数量最少为1
          item.amount = 1
        }
      }
      this.calcTotalPrice()// 每次改变商品数量就调用计算总金额函数
    },
    calcTotalPrice () {
      this.totalMoney = 0
      for (const i in this.carts) {
        this.totalMoney += Number(this.carts[i].amount * this.carts[i].price)
      }
    }
  },
  created () {
    this.fetchCarts()
    this.calcTotalPrice()
  }
}
</script>
