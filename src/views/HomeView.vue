<template>
  <div class="home">

    <table v-if="students.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="index">
          <td>{{index + 1}}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.age }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>No student found</p>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  computed: {
    ...mapState(['students']),     
  },
  methods: {
    ...mapActions(['fetchStudentData']), 
    async fetchStudents() {
      await this.fetchStudentData();  
    },
  },
  mounted() {
      this.fetchStudents();   
    }
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
