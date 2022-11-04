<script setup>
import { useQuery, useMutation } from '@vue/apollo-composable'
import { watchEffect, computed } from '@vue/runtime-core';
import gql from 'graphql-tag'
import { useRoute, useRouter } from 'vue-router';
import { dateFormat } from '../components/dateTimeFomat.vue';

const route = useRoute();
const router = useRouter();

const BOARD_DETAIL_QUERY = gql`
  query getBoardById($boardId: ID!) {
    getBoardById(id: $boardId) {
      id
      title
      content
      status
      createdAt
      updatedAt
    }
  }
`;

const { result, loading, error } = useQuery(BOARD_DETAIL_QUERY, {
   boardId: route.params.id }, {
    fetchPolicy: 'cache-and-network',
   }
);
const board = computed(() => result?.value?.getBoardById ?? {})

watchEffect(() => {
  console.log(route.params.id);
})

// 게시글 수정 페이지로 이동
const goToBoardUpdate = function (id) {
  router.push({
    path: `/boards/update/${id}`
  });
}

// 게시글 삭제
const DELETE_BOARD = gql`
  mutation deleteBoard ($id: ID!) {
    deleteBoard(id: $id) {
      id
    }
  }
`;

const { error: deleteBoardError, mutate: deleteBoard } = useMutation(DELETE_BOARD)
const boardDelete = function (id) {
  deleteBoard({
    id: id
  });
  router.push({
    path: `/`
  })
}

</script>

<template>
  <p v-if="error">Error: {{ error.message }}</p>
  <p v-if="loading">Loding...</p>
  <div v-else>
    <h2>{{ board.title }}</h2>
    <p>내용: {{ board.content }}</p>
    <p>상태: {{ board.status }}</p>
    <p>작성일: {{ dateFormat(board.createdAt) }}</p>
    <p>수정일: {{ dateFormat(board.updatedAt) }}</p>
    <button id="update-button" @click="goToBoardUpdate(board.id)">수정</button>
    <button id="delete-button" @click="boardDelete(board.id)">삭제</button>
  </div>
</template>

<style scoped>
#delete-button {
  background-color: rgb(255, 0, 0);
}
</style>


