<template>
  <div class="step-form step-one" v-show="step == 0" @change="handleUserData()">
    <h3 class="step-title">寄送地址</h3>
    <div class="step-row fullname-row">
      <div class="title-row form-row">
        <label for="">稱謂</label>
        <div class="select-wrapper">
          <select name="" v-model="BI.sex">
            <option value="male" selected>先生</option>
            <option value="female">女士</option>
          </select>
        </div>
      </div>
      <div class="name-row form-row">
        <label for="">姓名</label>
        <input
          v-model="BI.name"
          type="text"
          id="name"
          placeholder="請輸入姓名"
        />
      </div>
    </div>
    <div class="step-row">
      <div class="phone-row form-row">
        <label for="">電話</label>
        <input
          v-model="BI.tel"
          type="text"
          id="phone-numbers"
          placeholder="請輸入行動電話"
        />
      </div>
      <div class="email-row form-row">
        <label for="">Email</label>
        <input
          v-model="BI.email"
          type="text"
          id="email"
          placeholder="請輸入Email"
        />
      </div>
    </div>
    <div class="step-row">
      <div class="city-row form-row">
        <label for="">縣市</label>
        <div class="select-wrapper">
          <select name="" id="" v-model="BI.locatation">
            <option value="" disabled selected>請選擇縣市</option>
            <option value="taipei">台北市</option>
            <option value="NewTaipei">新北市</option>
            <option value="Keelung">基隆市</option>
            <option value="Taoyuan">桃園市</option>
            <option value="HsinchuCity">新竹市</option>
            <option value="HsinchuCounty">新竹縣</option>
            <option value="Miaoli">苗栗縣</option>
            <option value="Taichung">台中市</option>
            <option value="ChanghuaCounty">彰化縣</option>
            <option value="Nantou">南投縣</option>
            <option value="Yunlin">雲林縣</option>
            <option value="Chiayi">嘉義縣</option>
            <option value="Tainan">台南市</option>
            <option value="Kaohsiung">高雄市</option>
            <option value="Pingtung">屏東縣</option>
            <option value="Yilan">宜蘭縣</option>
            <option value="Hualien">花蓮縣</option>
            <option value="Taitung">台東縣</option>
            <option value="Penghu">澎湖縣</option>
            <option value="Kinmen">金門縣</option>
            <option value="Lienchiang">連江縣</option>
          </select>
        </div>
      </div>
      <div class="address-row form-row">
        <label for="">地址</label>
        <input
          v-model="BI.address"
          type="text"
          id="address"
          placeholder="請輸入地址"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stepOne",
  props: {
    step: {
      type: Number,
      required: true,
    },
    formData: {
      type:Object
    }
  },
  data() {
    return {
      BI: {
        sex: "",
        name: "",
        tel: "",
        email: "",
        locatation: "",
        address: "",
      },
    };
  },
  methods: {
    handleUserData() {
      this.$emit("after-filled-out", this.BI);
    },
    fetchData(){
      this.BI = {...this.formData}
    }
  },
  created(){
    this.fetchData()
  }
};
</script>