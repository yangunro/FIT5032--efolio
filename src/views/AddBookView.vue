<template>
  <div class="container" style="max-width:520px">
    <h1 class="my-3">Add Book</h1>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <input v-model.trim="isbn" class="form-control" placeholder="isbn (number)" required />
      </div>
      <div class="mb-3">
        <input v-model.trim="name" class="form-control" placeholder="name" required />
      </div>
      <button class="btn btn-primary w-100" :disabled="loading" type="submit">
        {{ loading ? 'Saving…' : 'Add to Firestore' }}
      </button>
    </form>

    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
    <p v-if="ok" class="text-success mt-3">Added! Doc ID: <code>{{ docId }}</code></p>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"

const db = getFirestore()

const isbn = ref("")
const name = ref("")
const loading = ref(false)
const error = ref("")
const ok = ref(false)
const docId = ref("")

const addBook = async () => {
  error.value = ""
  ok.value = false
  docId.value = ""

  if (!isbn.value || !name.value) {
    error.value = "Both isbn and name are required."
    return
  }

  const isbnNum = Number(isbn.value)
  if (!Number.isFinite(isbnNum)) {
    error.value = "isbn must be a number."
    return
  }

  loading.value = true
  try {
    const docRef = await addDoc(collection(db, "books"), {
      isbn: isbnNum,
      name: name.value,
      createdAt: serverTimestamp()
    })
    ok.value = true
    docId.value = docRef.id
    isbn.value = ""
    name.value = ""
  } catch (e) {
    error.value = e.code || String(e)
  } finally {
    loading.value = false
  }
}
</script>
