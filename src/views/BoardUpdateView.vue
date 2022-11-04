<script setup>
import { ref } from "vue";
import { useMutation, useQuery } from '@vue/apollo-composable'
import { watchEffect, computed } from '@vue/runtime-core';
import gql from 'graphql-tag'
import { useRouter, useRoute } from 'vue-router';

// 라우터
const router = useRouter();
const route = useRoute();

// 게시글 정보 가져오기 gql
const BOARD_DETAIL_QUERY = gql`
  query Board($boardId: ID!) {
    getBoardById(id: $boardId) {
      id
      title
      content
      status
      createdAt
    }
  }
`;

const { result, loading, error } = useQuery(BOARD_DETAIL_QUERY, {
   boardId: route.params.id }
);
// const board = computed(() => result?.value?.getBoardById ?? {})

const id = ref('');
const title = ref('');
const content = ref('');
const status = ref('');

watchEffect(() => {
  if (result.value) {
    id.value = result.value.getBoardById.id;
    title.value = result.value.getBoardById.title;
    content.value = result.value.getBoardById.content;
    status.value = result.value.getBoardById.status;
  }
  // console.log(result.value.getBoardById);
})


// 게시글 수정 gql
// Define mutation
const UPDATE_BOARD = gql`
  # Increments a back-end counter and gets its resulting value
  mutation updateBoard($input: UpdateBoard) {
    updateBoard(input: $input) {
      id
    }
  }
`;

const { onDone, mutate: updateBoard } = useMutation(UPDATE_BOARD);

// 게시글 수정 제출 함수
const submitForm = function () {
  console.log(title, content, status);
  updateBoard({
    input: {
      id: id.value,
      title: title.value,
      content: content.value,
      status: status.value
    }
  });
  
  onDone((res) => {
    const boardId = computed(() => res?.data?.updateBoard.id ?? "")
    console.log(boardId.value);
    router.push({
      path: `/boards/${boardId.value}`
    });
  })

  watchEffect(() => {
    console.log(`onDone: ${onDone}`);
  })

}

</script>

<template>
  <form v-on:submit="submitForm">
    <div>
      <label for="title">제목: </label>
      <input id="title" type="text" v-model="title">
    </div>
    <div>
      <label for="content">내용: </label>
      <input id="content" type="text" v-model="content">
    </div>
    <div>
      <label for="status">상태: </label>
      <input id="status" type="text" v-model="status">
    </div>
    <br>
    <button type="submit">수정하기</button>
  </form>
</template>