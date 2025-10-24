<template>
  <div style="padding:24px;max-width:420px">
    <h1>Sign In</h1>
    <p><input v-model="email" type="text" class="form-control" placeholder="Email" /></p>
    <p><input v-model="password" type="password" class="form-control" placeholder="Password" /></p>
    <p>
      <button class="btn btn-primary w-100" :disabled="loading" @click="login">
        {{ loading ? 'Logging in…' : 'Login' }}
      </button>
    </p>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <p v-if="user" class="text-success">Current user: {{ user.email }} — Role: <b>{{ role }}</b></p>
    <hr />
    <button v-if="user" class="btn btn-outline-secondary w-100" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"


const ROLE_MAP = { "admin@fit5032.app": "admin" }
function getRoleByEmail(email) {
  if (!email) return "guest"
  const e = String(email).toLowerCase()
  return ROLE_MAP[e] || "user"
}

const email = ref("")
const password = ref("")
const error = ref("")
const user = ref(null)
const role = ref("guest")
const loading = ref(false)
const router = useRouter()
const auth = getAuth()

onAuthStateChanged(auth, (u) => {
  user.value = u
  role.value = getRoleByEmail(u?.email)
  if (u) console.log("Signed in:", u.email, "role:", role.value)
})

const login = async () => {
  error.value = ""
  loading.value = true
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.replace("/") 
  } catch (e) {
    error.value = e.code || "Login failed"
    console.log(e)
  } finally {
    loading.value = false
  }
}

const logout = async () => {
  await signOut(auth)
  console.log("User logged out")
}
</script>


