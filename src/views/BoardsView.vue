<script setup>
import { useQuery } from '@vue/apollo-composable';
import { watchEffect, computed } from '@vue/runtime-core';
import gql from 'graphql-tag';
import { useRouter } from 'vue-router';
import { dateFormat } from '../components/dateTimeFomat.vue';
import SlotModalLayout from '../views/SlotModalLayout.vue'
import { ref } from 'vue'

// 라우터
const router = useRouter();

// 모달
const showModal = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalStatus = ref('');
const showModalOfBoard = function (board) {
  modalTitle.value   = board.title;
  modalContent.value = board.content;
  modalStatus.value  = board.status;
};


// 게시글 목록 가져오기
const ALL_BOARD_QUERY = gql`
  query getAllBoard {
    getAllBoard {
      id
      title
      content
      status
      createdAt
    }
  }
`;

const { result, loading, error: getAllBoardsError } = useQuery(ALL_BOARD_QUERY, null, {
  fetchPolicy: 'cache-and-network',
});
const boards = computed(() => result?.value?.getAllBoard ?? []);

watchEffect(() => {
  console.log(boards);
});

// 게시글 상세 페이지로 이동
const goToBoardDetail = function (id) {
  router.push({
    path: `/boards/${id}`
  });
}

</script>

<template>
  <h1>게시판</h1>
  <p v-if="getAllBoardsError">Error: {{ getAllBoardsError.message }}</p>
  <p v-if="loading">Loding...</p>
  <table v-else class="table">
    <thead>
      <tr>
        <th> NO. </th>
        <th> 제목 </th>
        <th> 상태 </th>
        <th> 작성일 </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(board, index) in boards" :key="index" :id="`board`+board.id">
        <td @click="showModalOfBoard(board), showModal = true"> {{ index }} </td>
        <td @click="goToBoardDetail(board.id)"> {{ board.title }} </td>
        <td> {{ board.status }} </td>
        <td> {{ dateFormat(board.createdAt) }} </td>
      </tr>
    </tbody>
  </table>
  <!-- app -->
  <div id="app">
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <slot-modal-layout v-show="showModal" @close="showModal = false">
      <template #header>
        <h3>{{ modalTitle }}</h3>
      </template>
  
      <template #default>
        <p>내용 : {{ modalContent }}</p>
      </template>
      
      <template #footer>
        상태 : {{ modalStatus }}
      </template>
    </slot-modal-layout>
  </div>

</template>

<style scoped>

table {

font-size :20px;

border-collapse: collapse;

width: 800px;

border: 1px solid gray;    

text-align: center;

}

td {

border: 1px solid gray;    

padding: 4px;

}

th {

border: 1px solid gray;   

background: rgb(192, 192, 192);

padding: 8px;

}

</style>