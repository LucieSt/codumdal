<template>
  <div id="app" class="app-container">

    <b-nav pills align="center">
      <b-nav-item active-class="active" to="/" exact>Domů</b-nav-item>
      <b-nav-item active-class="active" to="/recept" exact>Detail receptu</b-nav-item>
      <b-nav-item active-class="active" to="/novy-recept" exact>Nový recept</b-nav-item>
    </b-nav>

    <router-view/>
  </div>
</template>
