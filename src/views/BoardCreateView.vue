<script setup>
import { ref } from "vue";
import { useMutation, useQuery } from '@vue/apollo-composable'
import { watchEffect, computed } from '@vue/runtime-core';
import gql from 'graphql-tag'
import { useRouter } from 'vue-router';
import { Form, Field } from 'vee-validate';
import * as yup from 'yup';

// 라우터 
const router = useRouter();


// 게시글 밸리데이션
const boardSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  status: yup.string().required(),
});

// const { errors } = useForm({
//   validationSchema: boardSchema,
// });


// 게시글 생성
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

const submitForm = function (values) {
  // alert('S\n\n' + JSON.stringify(values, null, 4))
  console.log(title, content, status);
  createBoard({
    input: {
      title: title.value,
      content: content.value,
      status: status.value
    }
  });
  
  console.log(error);
  
  watchEffect(() => {
    console.log(`onDone: ${onDone}`);
  })

  onDone((res) => {
    const boardId = computed(() => res?.data?.createBoard.id ?? "")
    console.log(boardId.value);
    router.push({
      path: `/boards/${boardId.value}`
    });
  })
}


</script>

<template>
  <Form v-on:submit="submitForm" :validation-schema="boardSchema" v-slot="{ errors }">
    <div>
      <label for="title">제목: </label>
      <Field id="title" name="title" type="text" v-model="title" v-focus />
      <br>
      <span class="validate-error">{{ errors.title }}</span>
    </div>
    <div>
      <label for="content">내용: </label>
      <Field id="content" name="content" type="text" v-model="content" />
      <br>
      <span class="validate-error">{{ errors.content }}</span>
    </div>
    <div>
      <label for="status">상태: </label>
      <Field id="status" name="status" type="text" v-model="status" />
      <br>
      <span class="validate-error">{{ errors.status }}</span>
    </div>
    <br>
    <button type="submit">작성하기</button>
  </Form>
</template>

<style scoped>
.validate-error {
  color: red;
}
</style>