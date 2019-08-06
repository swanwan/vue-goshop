<template>
  <section class="login_page">
    <div class="login_head">
      <div class="head_logo">
        同福客栈外送
      </div>
      <div class="head_title">
        <p class="login_msg_title" :class="{on:loginWay}" @click="loginWay=true">短信登录</p>
        <p class="login_password_title" :class="{on:!loginWay}" @click="loginWay=false">密码登录</p>
      </div>
    </div>
    <section class="login_content">
      <div class="login_msg" v-if="loginWay">
        <div class="login_msg_input">
          <at-input v-model="inputTel" key="inputTel" placeholder="输入手机号" size="large" class="input_margin">
            <template slot="append">
              <span>获取验证码</span>
            </template>
          </at-input>
          <at-input v-model="inputVerify" key="inputVerify" placeholder="输入验证码" size="large" class="input_margin"></at-input>
        </div>
        <section class="login_msg_hint">
          <i class="iconfont icon-fangxiang"></i>
          <span>温馨提示：未注册过同福客栈外卖帐号的手机号或者邮箱，登录时即自动注册，且代表已同意</span>
          <a href="javascript:;">《用户服务协议》</a>
          <span>。</span>
        </section>
      </div>
      <div class="login_password" v-else>
        <div class="login_password_input">
          <at-input v-model="inputTelAndEmail" key="inputTelAndEmail" placeholder="手机号/邮箱" size="large" class="input_margin"></at-input>
          <at-input v-model="inputPsd" key="inputTelAndEmail" type="password" placeholder="密码" size="large" class="input_margin"></at-input>
          <at-input v-model="inputVerifyValue" key="inputTelAndEmail" placeholder="请输入内容" size="large" class="input_margin">
            <template slot="append">
              <span>验证码</span>
            </template>
          </at-input>
        </div>
      </div>
    </section>
    <div class="login_button">
        <at-button type="primary" class="gogogo">登录</at-button>
        <span class="aboutUs">关于我们</span>
    </div>
    <div class="login_back">
      <a href="javascript:" class="go_back" @click="$router.back(-1)">
        <i class="iconfont icon-icon-test"></i>
      </a>
    </div>
  </section>
</template>
<script>
  import { Input as AtInput, Button as AtButton} from 'at-ui'

  export default {
    name: 'HomeSwiper',
    components: {
      AtInput, AtButton
    },
    data () {
      return {
        loginWay:true,
        inputTel:'',
        inputVerify:'',
        inputTelAndEmail:'',
        inputPsd:'',
        inputVerifyValue:''
      }
    }
  }
</script>
<style lang="scss">
  .login_page {
    width: 100vw;
    height: 100vh;
    box-sizing:border-box;
    padding: 10vh 10vw;
    .login_head {
      width: 100%;
      margin: 0 auto;
      .head_logo {
        text-align: center;
        font-size: 38px;
        font-weight: 600;
        background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
      .head_title {
        width: 228px;
        margin: 10px auto;
        display: flex;
        justify-content: space-between;
        p {
          font-size: 15px;
          padding: 2px 0px;
          &.on {
            border-bottom: 2px solid #f58b83;
            font-weight: 600;
            color: #f58b83;
          }
        }

      }
    }
    .login_content {
      width: 100%;
      input {
        height: 7vh;
        font-size: 16px;
      }
      .login_msg {
        .login_msg_input {
          .input_margin {
            margin: 18px 0px;
          }
        }
        .login_msg_hint {
          i {
            font-size: 10px;
            padding: 0 10px 0;
          }
          color: #999;
          font-size: 12px;
          margin-bottom: 20px;
        }
      }
      .login_password {
        .login_password_input {
          .input_margin {
            margin: 18px 0;
          }
        }
      }
    }
    .login_button {
      width: 100%;
      .gogogo {
        width: 100%;
        height: 6vh;
        margin-bottom: 10px;
      }
      .aboutUs{
        width: 54px;
        display:block;
        color: #999;
        font-size: 12px;
        margin: 0 auto;
      }
    }
    .login_back {
      position: fixed;
      top: 1vh;
      left: 1vw;
      .go_back {
        i {
          font-size: 24px;
        }
      }
    }
  }
</style>