<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";

const router = useRouter();

const todos = ref([]);
const name = ref("");

const input_content = ref("");

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  }),
);

watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  {
    deep: true,
  },
);

const addTodo = () => {
  if (input_content.value.trim() === "") {
    return;
  }

  todos.value.push({
    id: uuidv4(),
    content: input_content.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });

  input_content.value = "";
};

const goToDetail = (todoId) => {
  router.push(`/${todoId}`);
};

const removeTodo = (id) => {
  todos.value = todos.value.filter((idRemove) => idRemove !== id);
};

const enableEdit = (todo) => {
  todo.editable = true;
};

const disableEdit = (todo) => {
  todo.editable = false;
};

onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <main
      class="rounded-lg bg-slate-200 container mx-auto max-w-xl p-4 text-dark font-airbnb"
    >
      <section>
        <h1 class="flex items-center text-2xl font-bold">
          Hi,
          <input
            type="text"
            id="name"
            placeholder="Name"
            v-model="name"
            class="ml-2 flex-1 min-w-0 bg-transparent focus:outline-none"
          />
        </h1>
      </section>

      <section class="py-5">
        <form id="new-todo-form" @submit.prevent="addTodo">
          <h4 class="text-dark text-lg font-regular mb-3 mt-2">
            Type something here 👇🏻
          </h4>
          <input
            type="text"
            name="content"
            id="content"
            placeholder="e.g. learn Vue in 1 weeks"
            v-model="input_content"
            class="w-full text-md px-6 py-4 text-dark bg-white rounded-lg shadow-custom mb-6"
          />

          <button
            type="submit"
            class="w-full text-lg px-6 py-4 text-white bg-black rounded-lg shadow-custom cursor-pointer hover:opacity-75 transition-opacity duration-200"
          >
            Add
          </button>
        </form>
      </section>

      <section>
        <h2 class="text-dark text-lg font-normal mb-2">TODO LIST</h2>
        <div>
          <div
            v-for="todo in todos_asc"
            :key="todo.id"
            class="cursor-pointer flex items-center bg-white p-4 rounded-lg shadow-custom mb-4"
            :class="`todo-item ${todo.done && 'done'}`"
          >
            <label>
              <input
                type="checkbox"
                v-model="todo.done"
                class="w-5 h-5 mr-4 rounded-full flex items-center justify-center"
              />
            </label>

            <div
              v-if="!todo.editable"
              class="flex-1 flex"
              @click="goToDetail(todo.id)"
            >
              <p
                class="content-center w-full text-md text-dark focus:outline-none"
                :class="{ 'line-through text-grey': todo.done }"
              >
                {{ todo.content }}
              </p>
              <button
                @click.stop="enableEdit(todo)"
                class="ml-2 px-2 py-1 mr-1 rounded bg-blue-500 text-white hover:bg-blue-700"
              >
                Edit
              </button>
            </div>

            <div v-else class="flex-1 flex">
              <input
                v-model="todo.content"
                class="content-center w-full text-md text-dark focus:outline-none"
                :class="{ 'line-through text-grey': todo.done }"
              />
              <button
                @click="disableEdit(todo)"
                class="ml-2 px-2 py-1 mr-1 rounded bg-green-500 text-white hover:bg-green-700"
              >
                Save
              </button>
            </div>

            <div class="actions">
              <button
                class="px-2 py-1 rounded bg-red-500 text-white hover:opacity-75"
                @click="removeTodo(todo)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
