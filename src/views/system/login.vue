<template>
  <div class="container">
    <div class="box">
      <div class="login-content-left">
        <img :src="loginLeftPng" alt="loginImg"/>
        <div class="login-content-left-mask">
          <div>{{ systemTitle }}</div>
          <div>{{ systemSubTitle }}</div>
        </div>
      </div>
      <div class="box-inner">
        <h1>{{ WelcomeDescription }}</h1>
        <el-form class="form">
          <el-input
              size="large"
              v-model="form.username"
              placeholder="Username"
              type="text"
              maxlength="50"
          >
            <template #prepend>
              <el-icon>
                <User/>
              </el-icon>
            </template>
          </el-input>
          <el-input
              size="large"
              ref="password"
              v-model="form.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              maxlength="50"
          >
            <template #prepend>
              <el-icon>
                <Key/>
              </el-icon>
            </template>
            <template #append>
              <el-icon>
                <ViewEye @mousedown="viewPassword" @mouseup="hidePassword"/>
              </el-icon>
            </template>
          </el-input>
          <el-button type="primary" :loading="form.loading" @click="submit" style="width: 100%;" size="default">
            Login
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import elMessage from "@/utils/system/element-ui-wrap.js";
import loginLeftPng from "@/assets/login/left.jpg";
import {systemSubTitle, systemTitle, WelcomeDescription} from "@/config/index.js";
import {Key, User, View as ViewEye} from "@element-plus/icons-vue";
import {useUserStore} from "@/stores/user.js";

const router = useRouter();
const userStore = useUserStore();
const form = reactive({
  username: "",
  password: "",
  loading: false
});
const passwordType = ref("password");

function viewPassword() {
  passwordType.value = "";
}

function hidePassword() {
  passwordType.value = "password";
}

function checkForm() {
  return new Promise((resolve) => {
    if (form.username === "") {
      elMessage.msgWarning("username is empty");
      return;
    }
    if (form.password === "") {
      elMessage.msgWarning("password is empty");
      return;
    }
    resolve(true);
  });
}

function submit() {
  checkForm().then(() => {
    form.loading = true;
    let params = {
      username: form.username,
      password: form.password
    };
    userStore.logIn(params).then(() => {
      elMessage.msgSuccess("Login successfully");
      location.reload();
    }).catch(() => {
    }).finally(() => {
      form.loading = false;
    })
  });
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #fff url("@/assets/login/bg.png") no-repeat center;
  overflow: hidden;
  background-size: cover;
  user-select: none;

  .box {
    width: 1160px;
    display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    background: white;
    border-radius: 8px;
    transform: translate(-50%, -50%);
    height: 440px;
    overflow: hidden;
    box-shadow: 0 6px 20px 5px rgba(152, 152, 152, 0.1),
    0 16px 24px 2px rgba(117, 117, 117, 0.14);

    .login-content-left {
      position: relative;

      img {
        height: 440px;
      }

      .login-content-left-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(rgba(0, 204, 222, 0.8), rgba(51, 132, 224, 0.8));
        text-align: center;
        color: #fff;
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        letter-spacing: 2px;

        div:nth-child(1) {
          font-size: 3.5rem;
          margin-bottom: 1em;
        }
      }
    }

    .box-inner {
      width: 500px;

      h1 {
        margin-top: 80px;
        text-align: center;
      }

      .form {
        width: 80%;
        margin: 50px auto 15px;

        .el-input {
          margin-bottom: 20px;
        }

        .password-icon {
          cursor: pointer;
          color: #409eff;
        }
      }

      .fixed-top-right {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
  }
}

@media screen and (max-width: 1260px) {
  .login-content-left {
    display: none;
  }
  .box {
    width: 500px !important;
  }
}

@media screen and (max-width: 750px) {
  .container .box, .container .box-inner {
    width: 100vw !important;
    height: 100vh;
    box-shadow: none;
    left: 0;
    top: 0;
    transform: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      margin-top: 0;
    }
  }
}
</style>
