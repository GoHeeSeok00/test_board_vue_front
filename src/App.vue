

<template>
  <nav>
    <router-link to="/">게시판</router-link> |
    <router-link to="/boards/create">글쓰기</router-link>
  </nav>
  <router-view></router-view>
</template>

<style>

#app {
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
