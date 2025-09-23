<template>
  <div style="padding:24px; max-width:420px">
    <h1>Create Account</h1>
    <p><input v-model="email" type="text" placeholder="Email" class="form-control" /></p>
    <p><input v-model="password" type="password" placeholder="Password" class="form-control" /></p>
    <p><button class="btn btn-primary w-100" @click="register">Register</button></p>

    <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    <p v-if="ok" class="text-success mt-2">Registered! Go to Sign In.</p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const error = ref("")
const ok = ref(false)

const auth = getAuth()
const router = useRouter()

const register = () => {
  error.value = ""
  ok.value = false
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Registered successfully")
      ok.value = true
      router.push("/FireLogin")
    })
    .catch((e) => {
      error.value = e.code
      console.log(e.code)
    })
}
</script>
