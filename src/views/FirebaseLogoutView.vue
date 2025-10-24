<template>
  <div style="padding:24px;max-width:420px">
    <h1>Logout</h1>
    <p v-if="user">Signed in as: {{ user.email }} — Role: <b>{{ role }}</b></p>
    <p v-else>Not signed in</p>
    <button class="btn btn-outline-secondary w-100 mt-2" :disabled="!user" @click="logout">
      Logout
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"


const auth = getAuth()
const user = ref(null)
const role = ref("guest")

onAuthStateChanged(auth, (u) => {
  user.value = u
  role.value = getRoleByEmail(u?.email)
  console.log("Auth state:", u?.email || null, "role:", role.value)
})

const logout = async () => {
  await signOut(auth)
  console.log("After signOut currentUser:", auth.currentUser)
}
</script>
