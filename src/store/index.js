import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    students: [],
    users: [],
    loggedIn: false, // New state to track login status
  },
  mutations: {
    setUser(state, userData) {
      state.users = userData;
    },
    addUser(state, newUser) {
      state.users.push(newUser);
    },
    setStudent(state, studentData) {
      state.students = studentData;
    },
    addStudent(state, newStudent) {
      state.students.push(newStudent);
    },
    UPDATE_STUDENT(state, updatedStudent) {
      const index = state.students.findIndex(student => student.id === updatedStudent.id);
      if (index !== -1) {
        state.students.splice(index, 1, updatedStudent);
      }
    },
    REMOVE_STUDENT(state, studentId) {
      const index = state.students.findIndex(student => student.id === studentId);
      if (index !== -1) {
        state.students.splice(index, 1);
      }
    },
    setLoggedIn(state, status) {
      state.loggedIn = status;
    }
  },
  actions: {
    async fetchStudentData({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/students');
        commit('setStudent', response.data);
      } catch (error) {
        console.log('Error fetching student data:', error);
      }
    },
    async createStudent({ commit }, studentData) {
      try {
        const response = await axios.post('http://localhost:3000/students', studentData);
        commit('addStudent', response.data);
      } catch (error) {
        console.error('Error creating student:', error);
      }
    },
    async updateStudent({ commit }, updatedStudent) {
      try {
        const response = await axios.put(`http://localhost:3000/students/${updatedStudent.id}`, updatedStudent);
        commit('UPDATE_STUDENT', response.data);
      } catch (error) {
        console.error('Error updating student:', error);
      }
    },
    async deleteStudentById({ commit }, studentId) {
      try {
        await axios.delete(`http://localhost:3000/students/${studentId}`);
        commit('REMOVE_STUDENT', studentId);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    },
    async signUpUser({ commit }, signUpInfo) {
      try {
        const response = await axios.post('http://localhost:3000/users', signUpInfo);
        commit('addUser', response.data);
      } catch (error) {
        console.error('Error signing up user:', error);
      }
    },
    async loginUser({ commit }, { email, password }) {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const user = response.data.find(
          user => user.email === email && user.password === password // Check for email and password
        );

        if (user) {
          // Set user as logged in on the JSON server
          await axios.patch(`http://localhost:3000/users/${user.id}`, { loggedIn: true });
          commit('setLoggedIn', true); // Update Vuex state
          return true; // Success response for handling in component
        } else {
          commit('setLoggedIn', false); // No match found
          return false; // Failure response
        }
      } catch (error) {
        console.error('Error logging in user:', error);
        return false;
      }
    },
    async logoutUser({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const admin = response.data.find(user => user.name === 'admin');

        if (admin) {
          // Update loggedIn status to false on JSON server
          await axios.patch(`http://localhost:3000/users/${admin.id}`, { loggedIn: false });
          commit('setLoggedIn', false); // Update Vuex state
        }
      } catch (error) {
        console.error('Error logging out user:', error);
      }
    }
  },
  getters: {
    isAuthenticated: state => state.loggedIn
  }
});
