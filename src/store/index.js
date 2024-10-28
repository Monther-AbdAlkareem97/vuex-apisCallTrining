import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    students: [],
    users: [],
    loggedIn: false,
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
          user => user.email === email && user.password === password
        );

        if (user) {
          await axios.patch(`http://localhost:3000/users/${user.id}`, { loggedIn: true });
          commit('setLoggedIn', true);
          return true;
        } else {
          commit('setLoggedIn', false);
          return false;
        }
      } catch (error) {
        console.error('Error logging in user:', error);
        return false;
      }
    },
    async logoutUser({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const loggedInUser = response.data.find(user => user.loggedIn);
        if (loggedInUser) {
          await axios.patch(`http://localhost:3000/users/${loggedInUser.id}`, { loggedIn: false });
          commit('setLoggedIn', false);
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
