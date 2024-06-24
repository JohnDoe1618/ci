<template>
    <div class="profile-view">
        <header class="profile-view__header">
            <div class="header__avatar-layout">
                <label for="avatar">
                    <i class="avatar-stub pi pi-camera"></i>
                </label>
                <input id="avatar" type="file" accept="image/*" v-show="false">
            </div>
            <div class="header__username-layout">
                <h1 class="username">Alex Mercer Surname</h1>
            </div>
        </header>
        <main class="profile-view__main">
            <div class="main-module">
                <h2 class="module__header">General data</h2>
                <ul class="data-list">
                    <li class="data-list__item">Firstname</li>
                    <li class="data-list__item">Lastname</li>
                    <li class="data-list__item">Surname</li>
                    <li class="data-list__item">Gender</li>
                </ul>
            </div>
        </main>
    </div>
</template>

<script>

</script>

<style scoped>
.profile-view {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    padding: 2rem;
}
/* HEADER */
.profile-view__header {
    width: 80%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: #fff;
    box-shadow: 2px 2px 10px rgba(0,0,0,.2);
    border-radius: 10px;
}
.header__avatar-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    border: 2px dashed rgba(0,0,0,.3);
}
.avatar-stub {
    font-size: 120px;
    transition: all 0.6s ease;
    cursor: pointer;
    color: var(--main-fg-light);
}
.avatar-stub:hover {
    scale: 1.02;
    transition: all 0.6s ease;
    color: var(--main-fg-light--hover);
}
.header__username-layout {
    margin: 1rem;
}
.username {
    /* font-size: 2.4rem; */
    /* font-family: var(--font); */
    /* color: var(--p-yellow-500); */
    /* color: var(--main-fg-light); */

}

/* MAIN */
.profile-view__main {
    width: 80%;
    height: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    background-color: #fff;
    box-shadow: 2px 2px 10px rgba(0,0,0,.2);
    border-radius: 10px;
    overflow: auto;
}
.main-module {
    width: 100%;
    height: max-content;
}
.module__header {
    width: max-content;
    padding-right: 1rem;
    font-family: monospace;
    border-bottom: 2px solid rgba(0,0,0,.2);
}

.data-list {

}
</style>