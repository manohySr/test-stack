<script setup>
import { reactive } from "vue";
import { z } from "zod";
import Title from "./ui/Title.vue";
import Button from "./ui/Button.vue";
import { addTaskQuery } from "@/graphql/queries";
import graphqlFetch from "@/graphql/lib";

const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit comporter au moins 3 caractères")
    .max(100, "Le titre doit comporter au maximum 100 caractères"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"], "Priorité invalide"),
});

const form = reactive({
  title: "",
  description: "",
  priority: "low",
});

const errors = reactive({
  title: "",
  description: "",
  priority: "",
});

const createTask = async (form) => {
  const query = addTaskQuery(form);
  return await graphqlFetch(query);
};

const handleSubmit = async () => {
  errors.title = "";
  errors.description = "";
  errors.priority = "";

  try {
    // Validate form data using the Zod schema
    taskSchema.parse(form);
    const data = await createTask(form);

    console.log(data);

    if (data.errors) {
      console.error(data);
      throw new Error("Error");
    }

    alert("Tache créee avec succés");
    window.location.reload();
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle validation errors by updating the errors object
      err.errors.forEach((error) => {
        errors[error.path[0]] = error.message;
      });
    }
    alert("Erreur de validation");
  }
};
</script>

<template>
  <div class="container mx-auto p-6">
    <Title>Ajouter une tâche</Title>
    <form @submit.prevent="handleSubmit" class="form flex flex-col gap-4">
      <input
        v-model="form.title"
        type="text"
        placeholder="La tâche à faire..."
        class="border p-2 rounded w-full"
      />
      <span v-if="errors.title" class="text-red-500 text-sm"
        >{{ errors.title }}*</span
      >

      <textarea
        v-model="form.description"
        placeholder="Décrire la tâche ici..."
        rows="4"
        class="border p-2 rounded w-full"
      ></textarea>
      <span v-if="errors.description" class="text-red-500 text-sm"
        >{{ errors.description }}*</span
      >

      <label for="priority" class="text-sm font-medium">Priorité :</label>
      <select
        v-model="form.priority"
        id="priority"
        class="border p-2 rounded w-full"
      >
        <option value="low">Bas</option>
        <option value="medium">Normal</option>
        <option value="high">Haut</option>
      </select>

      <Button type="submit" class="md:w-full">Ajouter la tâche</Button>
    </form>
  </div>
</template>
