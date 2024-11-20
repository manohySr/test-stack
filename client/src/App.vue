<script setup>
import CreateView from "@/components/Create.view.vue";
import Title from "@/components/ui/Title.vue";
import Info from "@/components/ui/Info.vue";
import IconButton from "@/components/ui/IconButton.vue";
import Button from "@/components/ui/Button.vue";
import graphqlFetch from "./graphql/lib";
import Modal from "./components/ui/Modal.vue";
import { computed, onMounted, reactive, ref, watch } from "vue";
import {
  deleteTaskQuery,
  getTasksQuery,
  toogleCompletionQuery,
} from "./graphql/queries";

const priority = {
  high: "haut",
  medium: "normal",
  low: "bas",
};

const fetchTaskState = reactive({
  tasks: [],
  isLoading: false,
});

const filter = reactive({
  priority: null,
  completed: null,
});

const completionState = ref(0);

const fetchTasks = async () => {
  try {
    fetchTaskState.isLoading = true;
    const query = getTasksQuery(filter.priority, filter.completed);
    const { data } = await graphqlFetch(query);
    fetchTaskState.tasks = data.getTasks;
  } catch (error) {
    console.error(error);
  } finally {
    fetchTaskState.isLoading = false;
  }
};

const deleteTask = async (id) => {
  try {
    const confirm = window.confirm("Etes vous sure de supprimer ?");
    if (!confirm) {
      return;
    }
    const query = deleteTaskQuery(id);
    await graphqlFetch(query);
  } catch (error) {
    console.log(error);
  } finally {
    await fetchTasks();
  }
};

onMounted(async () => {
  await fetchTasks();
});

const filteredTasks = computed(() => {
  return fetchTaskState.tasks.filter((task) => {
    const matchesCompleted =
      filter.completed === null || task.completed === filter.completed;
    const matchesPriority =
      filter.priority === null || task.priority === filter.priority;
    return matchesCompleted && matchesPriority;
  });
});

const toggleCompletionTask = async (id) => {
  try {
    const confirm = window.confirm("Toggler la tâche ?");
    if (!confirm) return;

    fetchTaskState.isLoading = true;
    const query = toogleCompletionQuery(id);
    await graphqlFetch(query);
  } catch (error) {
    console.error("Error toggling task completion:", error);
  } finally {
    fetchTaskState.isLoading = false;
    await fetchTasks();
  }
};

const showModal = ref(false);
</script>

<template>
  <!-- Loader -->
  <div
    v-if="fetchTaskState.isLoading"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
  >
    <div
      class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"
    ></div>
  </div>

  <Modal :isVisible="showModal" @close="showModal = false">
    <CreateView />
  </Modal>

  <div class="p-8 space-y-6">
    <!-- Title -->
    <Title class="text-4xl font-extrabold text-gray-800 mb-4">Todo(s)</Title>

    <div class="flex justify-end">
      <Button @click="showModal = true">Ajouter une tâche</Button>
    </div>

    <div>
      <h1 class="mb-2">Filtre:</h1>
      <div class="flex gap-2">
        <select v-model="filter.completed" class="border p-2 rounded">
          <option :value="null">Toutes</option>
          <option :value="true">Complétée(s)</option>
          <option :value="false">Non complétée(s)</option>
        </select>

        <select v-model="filter.priority" class="border p-2 rounded">
          <option :value="null">Toutes</option>
          <option value="low">Bas</option>
          <option value="medium">Normal</option>
          <option value="high">Haut</option>
        </select>
      </div>
    </div>

    <!-- Todo Cards -->
    <Info>Cliquer pour la tâche toggler entre complétée et non complétée</Info>

    <!-- Empty State Message -->
    <div
      v-if="!fetchTaskState.isLoading && fetchTaskState.tasks.length === 0"
      class="text-center text-gray-500 mt-10"
    >
      <div class="text-2xl font-bold">Aucune tâche trouvée</div>
      <p class="text-sm mt-2">Ajoutez une nouvelle tâche pour commencer!</p>
    </div>

    <div
      v-for="todo in filteredTasks"
      :key="todo.id"
      :class="[
        'flex justify-between rounded-lg shadow-lg cursor-pointer',
        todo.priority === 'high' ? 'bg-red-500' : '',
        todo.priority === 'medium' ? 'bg-yellow-500' : '',
        todo.priority === 'low' ? 'bg-green-500' : '',
      ]"
      @click="() => toggleCompletionTask(todo.id)"
    >
      <div class="flex flex-col p-6 gap-2 text-white">
        <span class="text-xl font-semibold">{{ todo.title }}</span>
        <span class="text-sm text-gray-200">{{ todo.description }}</span>
        <span
          :class="[
            'text-xs font-bold px-2 py-1 rounded',
            todo.priority === 'high' ? 'bg-red-700' : '',
            todo.priority === 'medium' ? 'bg-yellow-700' : '',
            todo.priority === 'low' ? 'bg-green-700' : '',
          ]"
          class="self-start"
        >
          {{ priority[todo.priority].toUpperCase() }}
        </span>
      </div>
      <div class="flex relative">
        <span
          :class="[
            'text-xs font-bold px-2 py-1 rounded',
            todo.completed ? 'bg-green-600' : 'bg-red-600',
          ]"
          class="self-start"
        >
          {{ todo.completed ? "COMPLETEE" : "NON COMPLETEE" }}
        </span>

        <!-- delete button -->
        <IconButton
          class="absolute right-2 bottom-2"
          @click="() => deleteTask(todo.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a2 2 0 012-2h4a2 2 0 012 2m-8 0h8"
            />
          </svg>
        </IconButton>
      </div>
    </div>
  </div>
</template>
