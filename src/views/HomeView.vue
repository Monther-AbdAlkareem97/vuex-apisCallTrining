<template>
  <div class="home p-4">
    <table v-if="students.length > 0" class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead>
        <tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">ID</th>
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-left">Age</th>
        </tr>
      </thead>
      <tbody class="text-gray-700 text-sm font-light">
        <tr v-for="(student, index) in students" :key="index" class="border-b border-gray-200 hover:bg-gray-50">
          <td class="py-3 px-6 text-left">{{ index + 1 }}</td>
          <td class="py-3 px-6 text-left">{{ student.name }}</td>
          <td class="py-3 px-6 text-left">{{ student.age }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else class="text-center text-gray-500 mt-4">No student found</p>
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
