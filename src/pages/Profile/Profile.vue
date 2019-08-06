<template>
  <div class="profile_pages">
    <section class="profile_head">
      <div class="profile_head_content">
        <span class="profile_head_title">{{this.$route.path.split('/').join('')}}</span>
      </div>
      <div class="profile_head_bottom">
        <div class="head_bottom_img">
          <i class="icon-geren iconfont"></i>
        </div>
        <div class="head_bottom_content">
            <span class="nickname">昵称</span>
            <div class="moblie">
               <i class="iconfont icon-shouji"></i>
               <span class="">手机号</span>
            </div>
        </div>
        <div class="head_bottom_arrow">
          <i class="iconfont icon-arrow"></i>
        </div>
      </div>
    </section>
    <div class="profile_content">
      <div class="profile_table">
        <table>
          <tr class="profile_table_name">
            <th>我的余额</th>
            <th>我的优惠</th>
            <th>我的积分</th>
          </tr>
          <tr>
            <th>
              <span class="name_orange">0.00</span>元
            </th>
            <th>
              <span class="name_red">0</span>个
            </th>
            <th>
              <span class="name_green">0</span>积分
            </th>
          </tr>
        </table>
      </div>
      <div class="profile_list">
        <ul>
          <li class="profile_list_order">
            <i class="iconfont icon-dingdan"></i>
            <span>我的订单</span>
          </li>
          <li class="profile_list_integral">
            <i class="iconfont icon-money"></i>
            <span>积分商城</span>
          </li>
          <li class="profile_list_vip">
            <i class="iconfont icon-VIP"></i>
            <span>同福客栈外卖会员卡</span>
          </li>
          <li class="profile_list_servie_center">
            <i class="iconfont icon-Service"></i>
            <span>服务中心</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>
<style lang="scss">
  .profile_pages {
    width: 100vw;
    .profile_head{
      width:100%;
      height: 22vh;
      display: flex;
      flex-direction: column;
      box-sizing:border-box;
      padding: 0 1.8rem;
      background: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
      border-bottom: 1px solid #e4e4e4;
      .profile_head_content {
        font-size: 1.8rem;
        text-align: center;
      }
      .profile_head_bottom {
        display: flex;
        justify-content:flex-start;
        position: relative;
        .head_bottom_img {
          i {
            font-size: 4rem;
            padding: 0 10px;
          }
        }
        .head_bottom_content {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 12px 0px;
          .nickname {
            font-size: 20px;
          }
        }
        .head_bottom_arrow {
          position: absolute;
          right: 10px;
          top: 30px;
          i {
            font-size: 20px;
          }
        }
      }
    }
    .profile_table {
      width:100%;
      table {
        width: 100%;
        border: 1px solid #fbfbfb;
        height: 12vh;
        color:#808080;
        tr {
          width: 100%;
          th {
            width: 33.3%;
            border-right: 1px solid #fbfbfb;
            padding: 5px 0;
          }
          .name_orange {
            color :#ff9900;
            font-size: 2rem;
            font-weight: 600;
          }
          .name_red {
            color :#ff5f3e;
            font-size: 2rem;
            font-weight: 600;
          }
          .name_green {
            color :#6ac20b;
            font-size: 2rem;
            font-weight: 600;
          }
        }
      }
    }
    .profile_list {
      width: 100%;
      padding:0px 10px;
      ul {
        .profile_list_order {
          i {
            color: #02a774;
          }
        }
        .profile_list_integral {
          i {
            color: #ff9900;
          }
        }
        .profile_list_vip {
          i {
            color: #ea3a15;
          }
        }
        .profile_list_servie_center {
          i {
            color: #02a774;
          }
        }
        li {
          border-bottom: 1px solid #fbfbfb;
          font-size: 17px;
          span {
            padding: 15px 5px;
            display: inline-block;
          }
        }
      }
    }
  }
</style>