<script setup>
import Title from "@/components/ui/Title.vue";
import Info from "@/components/ui/Info.vue";
import IconButton from "@/components/ui/IconButton.vue";
import Button from "@/components/ui/Button.vue";

const priority = {
  high: "haut",
  medium: "normal",
  low: "bas",
};

const todos = [
  {
    id: 1,
    title: "Build Backend",
    description: "Create a Node.js backend with GraphQL",
    priority: "high",
    completed: true, // Completed
  },
  {
    id: 2,
    title: "Design UI",
    description: "Create a user-friendly UI for the app",
    priority: "medium",
    completed: false, // Not Completed
  },
  {
    id: 3,
    title: "Write Docs",
    description: "Document API endpoints and architecture",
    priority: "low",
    completed: true, // Completed
  },
];

// import CreateView from "@/components/Create.view.vue";
// import UpdateView from "./components/Update.view.vue";
</script>

<template>
  <!-- <CreateView /> -->
  <!-- <UpdateView /> -->

  <div class="p-8 space-y-6">
    <!-- Title -->
    <Title class="text-4xl font-extrabold text-gray-800 mb-4">Todo(s)</Title>

    <div class="flex justify-end">
      <Button>Ajouter une tâche</Button>
    </div>

    <div class="flex gap-2">
      <select class="border p-2 rounded">
        <option :value="null">Toutes</option>
        <option :value="true">Complétée(s)</option>
        <option :value="false">Non complétée(s)</option>
      </select>

      <select class="border p-2 rounded">
        <option value="low">Bas</option>
        <option value="normal">Normal</option>
        <option value="high">Haut</option>
      </select>
    </div>

    <!-- Todo Cards -->
    <Info>Cliquer pour toggler entre complétée et non complétée</Info>
    <div
      v-for="todo in todos"
      :key="todo.id"
      :class="[
        'flex justify-between  rounded-lg shadow-lg cursor-pointer',
        todo.priority === 'high' ? 'bg-red-500' : '',
        todo.priority === 'medium' ? 'bg-yellow-500' : '',
        todo.priority === 'low' ? 'bg-green-500' : '',
      ]"
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

        <IconButton class="absolute right-2 bottom-2">
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
