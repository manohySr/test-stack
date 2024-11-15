# **Test Technique - Application de Gestion de Tâches**

Ce test a pour objectif d’évaluer vos compétences en Node.js, Vue.js, GraphQL et MongoDB. L’application aura pour but de gérer des tâches avec quelques fonctionnalités basiques.

## **Sujet du Test : Application de Gestion de Tâches**

### **1. Backend (Node.js, GraphQL, MongoDB)**

Créez une API permettant la gestion de tâches, avec les fonctionnalités suivantes :

- **Structure des données** : Chaque tâche doit comporter les champs suivants :
  - `id`
  - `title` (String, requis)
  - `description` (String, optionnel)
  - `completed` (Booléen, par défaut `false`)
  - `priority` (String, valeurs possibles : "low", "medium", "high")

- **Requêtes GraphQL** :
  - `getTasks(priority: String, completed: Boolean)` : Récupérer toutes les tâches avec options de filtre par priorité et état de complétion.
  - `getTaskById(id: ID!)` : Récupérer une tâche spécifique par son ID.

- **Mutations GraphQL** :
  - `addTask(title: String!, description: String, priority: String)` : Ajouter une nouvelle tâche avec validation de la priorité.
  - `updateTask(id: ID!, title: String, description: String, completed: Boolean, priority: String)` : Mettre à jour les informations d'une tâche.
  - `deleteTask(id: ID!)` : Supprimer une tâche.

### **2. Frontend (Vue.js)**

Créez une interface utilisateur avec Vue.js pour interagir avec l’API :

- **Liste des tâches** :
  - Afficher toutes les tâches avec leurs détails (titre, description, priorité, état).
  - Ajouter des filtres pour afficher uniquement les tâches "complétées" ou de certaines priorités.
  - Mettre en évidence les tâches ayant une priorité "haute".

- **Mise à jour et suppression** :
  - Ajouter un bouton permettant de marquer une tâche comme "complétée" ou "non complétée".
  - Permettre la suppression d’une tâche avec une confirmation avant la suppression.

- **Ajout de tâche** :
  - Ajouter un formulaire permettant de créer une nouvelle tâche avec des champs pour le titre, la description, et la priorité.
  - Valider que le titre est obligatoire et que la priorité est bien une des valeurs autorisées.

### **3. Instructions de Livraison**
- **Durée estimée** : 48h.
- **Documentation** : ajoutez un fichier `README.md` avec les instructions pour installer et lancer l’application (backend et frontend).
- **Code** : Assurez-vous que le code est structuré et bien commenté.

Merci pour votre participation, et bon test !
