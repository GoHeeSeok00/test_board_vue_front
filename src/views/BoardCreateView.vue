<script setup>
import { ref } from "vue";
import { useMutation, useQuery } from '@vue/apollo-composable'
import { watchEffect, computed } from '@vue/runtime-core';
import gql from 'graphql-tag'
import { useRouter } from 'vue-router';

const router = useRouter();

const CREATE_BOARD = gql`
  mutation createBoard ($input: NewBoard) {
    createBoard(input: $input) {
      id
    }
  }
`;

const title = ref('');
const content = ref('');
const status = ref('');

const { onDone, error, mutate: createBoard } = useMutation(CREATE_BOARD);

const submitForm = function () {
  console.log(title, content, status);
  createBoard({
    input: {
      title: title.value,
      content: content.value,
      status: status.value
    }
  });
  
  onDone((res) => {
    const boardId = computed(() => res?.data?.createBoard.id ?? "")
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
      <input id="title" type="text" v-model="title" v-focus>
    </div>
    <div>
      <label for="content">내용: </label>
      <input id="content" type="content" v-model="content">
    </div>
    <div>
      <label for="status">상태: </label>
      <input id="status" type="status" v-model="status">
    </div>
    <br>
    <button type="submit">작성하기</button>
  </form>
</template>