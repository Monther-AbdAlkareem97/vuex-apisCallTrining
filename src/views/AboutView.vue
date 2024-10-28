<template>
  <div class="dashboard">
    <button @click="logout" class="logout-button">
      Logout
    </button>

    <div class="about p-4">
      <form @submit.prevent="handleSubmit" class="space-y-4 max-w-md mx-auto">
        <input type="text" v-model="name" placeholder="Name" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="number" v-model="age" placeholder="Age" required
          class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
          Create Student
        </button>
      </form>
    </div>

    <div class="home mt-8 p-4 max-w-4xl mx-auto">
      <table v-if="students.length > 0" class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Age</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="index" class="bg-white border-t border-gray-200">
            <td class="px-4 py-2 text-sm text-gray-700">{{ index + 1 }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ student.name }}</td>
            <td class="px-4 py-2 text-sm text-gray-700">{{ student.age }}</td>
            <td class="px-4 py-2 space-x-2">
              <button @click="openUpdatePopup(student)"
                class="bg-yellow-500 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition duration-200">
                Update
              </button>
              <button @click="deleteStudent(student.id)"
                class="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-gray-500 text-center mt-4">No students found</p>

      <div v-if="showPopup" class="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="popup-content bg-white p-6 rounded-lg shadow-lg w-80 space-y-4">
          <h3 class="text-lg font-semibold text-gray-800">Edit Student</h3>
          <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
          <input v-model="editableStudent.name" id="name" type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <label for="age" class="block text-sm font-medium text-gray-700">Age:</label>
          <input v-model="editableStudent.age" id="age" type="number"
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div class="flex space-x-2">
            <button @click="updateStudentDetails"
              class="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              Save
            </button>
            <button @click="closePopup"
              class="bg-gray-300 text-gray-800 w-full py-2 rounded-lg hover:bg-gray-400 transition duration-200">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      age: '',
      showPopup: false,
      editableStudent: {},
    };
  },
  computed: {
    ...mapState(['students']),
  },
  methods: {
    ...mapActions(['createStudent', 'fetchStudentData', 'deleteStudentById', 'updateStudent', 'logoutUser']),
    async handleSubmit() {
      const newStudent = { name: this.name, age: this.age };
      await this.createStudent(newStudent);
      this.name = this.age = '';
    },
    async fetchStudents() {
      await this.fetchStudentData();
    },
    openUpdatePopup(student) {
      this.editableStudent = { ...student };
      this.showPopup = true;
    },
    async updateStudentDetails() {
      await this.updateStudent(this.editableStudent);
      this.closePopup();
    },
    deleteStudent(studentId) {
      this.deleteStudentById(studentId);
    },
    closePopup() {
      this.showPopup = false;
    },
    async logout() {
      await this.logoutUser();
      this.$router.push({ name: 'login' }); 
    }
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style scoped>
.dashboard {
  position: relative;
  
}

.logout-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #f56565;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #e53e3e;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
</style>
