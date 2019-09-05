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
    <form class="login_status" @submit.prevent="login">
      <section class="login_content">
        <div class="login_msg" v-if="loginWay">
          <div class="login_msg_input">
            <at-input v-model="phone" :maxlength="11" key="phone" placeholder="输入手机号" size="large" class="input_margin">
              <template slot="append">
                <button v-if="sending" :disabled="!rightPhone" @click="sendNumCode" :class="{class_phone:rightPhone}" class="button_class">获取验证码</button>
                <span v-else class="timer_num">{{timer}}s后点击</span>
              </template>
            </at-input>
            <at-input v-model="code" key="code" placeholder="输入验证码" size="large" class="input_margin"></at-input>
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
            <at-input v-model="name" key="name" placeholder="手机号/邮箱/用户名" size="large" class="input_margin" :maxlength="11"></at-input>
            <at-input v-model="pwd" key="pwd" :type="passwordType" placeholder="密码" size="large" class="input_margin" >
              <template slot="append" class="pwd-append">
                <at-switch @change="showAbcEvent" v-model="showAbc" class="pwd-switch">
                    <span slot="checkedText">显</span>
                    <span slot="unCheckedText">隐</span>
                </at-switch>
              </template>
            </at-input>
            <at-input v-model="captcha" key="captcha" placeholder="请输入内容" size="large" class="input_margin" :maxlength="4">
              <template slot="append" class="append_no_padding">
                <div class="captcha_input">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                    @click="getCaptcha" ref="captcha">
                </div>
              </template>
            </at-input>
          </div>
        </div>
      </section>
      <div class="login_button">
          <button class="gogogo">登录</button>
          <span class="aboutUs">关于我们</span>
      </div>
    </form>
    <div class="login_back">
      <a href="javascript:" class="go_back" @click="$router.back(-1)">
        <i class="iconfont icon-icon-test"></i>
      </a>
    </div>
     <AlertTip :description="description" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </section>
</template>
<script>
  import { Input as AtInput, Button as AtButton} from 'at-ui'
  import AlertTip  from '../../components/AlertTip/AlertTip.vue'
  import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api'
  export default {
    name: 'HomeSwiper',
    components: {
      AtInput, AtButton, AlertTip
    },
    data () {
      return {
        showAbc:true, //是否显示密码
        loginWay:true, //true代表短信登陆, false代表密码
        phone: '', //手机号
        code:'', // 短信验证码
        name:'',// 用户名
        pwd:'', //密码
        captcha:'', //图片验证码
        sending: true, //显示'获取验证码' or 'timer'
        timer: 0, //短信倒计时
        alertShow: false,
        description: '', //提示框文本内容
        passwordType:'password'//改变密码输入框 'password' or 'text'
      }
    },
    methods: {
      async sendNumCode() {
        //显示倒计时
        if(!this.timer) {
          this.timer = 30;
          this.sending = false;
          //定时器 启动倒计时
          this.timeOut = setInterval(()=> {
            this.timer--;
            if(this.timer <= 0) {
              //停止计时
              this.sending = true;
              clearInterval(this.timeOut)
            }
          },1000)
        }
        //发送ajax请求（向指定手机号发送验证码短信）
        const result = await reqSendCode(this.phone)
        if(result.code === 1) {
          //显示信息失败提示框
          this.showAlert(result.msg)
          //停止倒计时
          if(this.timer) {
            this.timer = 0
            this.sending = true;
            clearInterval(this.timeOut)
            this.timeOut = undefined
          }
        }
      },
      //异步登录
      async login () {
        let result
        if(this.loginWay) {
          //短信登录
          const {rightPhone, phone, code} = this;
          if(!this.rightPhone) {
            //手机号不正确
            this.showAlert('手机号不正确')
            return
          } else if(!/^\d{6}$/.test(code)){
              // 验证必须是6位数字
              this.showAlert('验证必须是6位数字')
              return
          }
          // 发送ajax请求短信登陆
          result = await reqSmsLogin(phone, code)
        }else {
          //密码登录
          const {name, pwd, captcha} = this
          if (!this.name) {
            // 用户名必须指定
            this.showAlert('用户名必须指定')
            return
          }
          else if (!this.pwd) {
            //密码必须填写
            this.showAlert('密码必须填写')
            return
          }
          else if (!this.captcha) {
            //验证码不正确
            this.showAlert('验证码不正确')
            return
          }
          // 发送ajax请求密码登陆
          result = await reqPwdLogin({name, pwd, captcha})
        }
        //停止计时
        if(this.timer) {
          this.timer = 0;
          this.sending = true;
          clearInterval(this.timeOut)
          this.timeOut = undefined;
        }
        //根据结果数据处理
        if(result.code === 0) {
          const user = result.data;
          // 将user保存到vuex的state
          this.$store.dispatch('recordUser', user)
          // 去个人中心界面
          this.$router.replace('/profile')
        }else {
          //显示新的图片验证码
          this.getCaptcha()
          // 显示警告提示
          const msg = result.msg
          this.showAlert(msg)
        }
      },
      //显示提示框
      showAlert(description) {
        this.alertShow = true
        this.description = description
      },
      // 关闭警告框
      closeTip () {
        this.alertShow = false
        this.alertText = ''
      },
      //显示隐藏密码
      showAbcEvent () {
        this.showAbc = !this.showAbc
        if(this.showAbc) {
          this.passwordType = 'text'
        }else {
          this.passwordType = 'password'
        }
      },
      //点击获取新的验证码图片
      getCaptcha() {
        this.$refs.captcha.src='http://localhost:4000/captcha?time='+Date.now()
      }
    },
    computed:{
      rightPhone() {
        return /^1\d{10}$/.test(this.phone)
      }
    },
    mounted (){
      //显示隐藏密码
      this.showAbcEvent()
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
            .timer_num {
              width: 60px;
              text-align: center;
            }
            .class_phone {
              color: #6190e8;
            }
            .button_class {
              padding: 0px;
              border: 0;
              background-color: #f7f7f7;
            }
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
            .pwd-switch {
              margin:0px 10px;
            }
            .at-input-group__append {
              height: 49.4px;
              padding: 0px;
              .captcha_input {
                img {
                  height: 49.3px;
                  display: block;
                }
              }
            }
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
        background-color: #6190e8;
        border-radius: 6px;
        border: 0px;
        color: white;
        outline: 0 none;
        &:active {
          background-color: #93b6f6;
        }
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