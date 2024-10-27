<template>
  <div class="about">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="number" v-model="age" placeholder="Age" required />
      <button type="submit">Create Student</button>
    </form>
  </div>

  <div class="home">
    <table v-if="students.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="index">
          <td>{{ index + 1}}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
          <td>
            <button @click="openUpdatePopup(student)">Update</button>
            <button @click="deleteStudent(student.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No students found</p>

    <div v-if="showPopup" class="popup">
      <div class="popup-content">
        <h3>Edit Student</h3>
        <label for="name">Name:</label>
        <input v-model="editableStudent.name" id="name" type="text" />
        <br>
        <label for="age">Age:</label>
        <input v-model="editableStudent.age" id="age" type="number" />
        <br>
        <button @click="updateStudentDetails">Save</button>
        <button @click="closePopup">Cancel</button>
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
    ...mapActions(['createStudent', 'fetchStudentData', 'deleteStudentById', 'updateStudent']),
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
  },
  mounted() {
    this.fetchStudents();
  },
};
</script>

<style scoped>
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
