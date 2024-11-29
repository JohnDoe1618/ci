<template>
    <div class="ci-view ci-block w-full profile-view">
        <header class="profile-view__header">
            <div class="header__avatar-layout relative">
                <input 
                id="avatar" 
                type="file" 
                accept="image/*" 
                v-show="false"
                @input="handlerFileInput($event.target.files[0])"
                >
                <label v-if="srcImg === null" for="avatar">
                    <i  class="avatar-stub pi pi-camera"></i>
                </label>
                <div v-else class="w-full h-full flex align-items-center justify-content-center">
                    <span class="absolute flex gap-2">
                        <svg-icon 
                        class="avatar-icon upload" 
                        @click="uploadAvatar"
                        type="mdi" 
                        :path="mdiTrayArrowUp" 
                        :size="40"
                        ></svg-icon>
                        <svg-icon 
                        class="avatar-icon reset" 
                        @click="srcImg = null"
                        type="mdi" 
                        :path="mdiWindowClose" 
                        :size="40"
                        ></svg-icon>
                    </span>
                    <img id="avatar-img" :src="srcImg" alt="Avatar">
                </div>
       
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

<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiTrayArrowUp, mdiWindowClose } from '@mdi/js';

const srcImg = ref(null);


function readImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        reader.onload = (evt) => {
            resolve(evt.target.result);
        };
    })
}
async function handlerFileInput(file) {
    try {
        srcImg.value = await readImage(file);
    } 
    catch (err) {
        throw err;
    }
}
function uploadAvatar() {
    try {
        console.log('upload avatar');
    } catch (err) {
        throw err;
    }
}
</script>

<style scoped>
.profile-view {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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
@keyframes rotate-right {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes rotate-left {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
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
    user-select: none;
    /* animation: rotate-right 60s linear infinite; */
}
.avatar-stub {
    font-size: 120px;
    transition: all 0.6s ease;
    cursor: pointer;
    color: var(--main-fg-light);
    /* animation: rotate-left 60s linear infinite; */
}
.avatar-stub:hover {
    scale: 1.02;
    transition: all 0.6s ease;
    color: var(--main-fg-light--hover);
}
#avatar-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.avatar-icon {
    background-color: rgba(0, 0, 0, 0.25);
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
}
.avatar-icon.upload {
    color: rgb(138, 230, 184);
    transition: all .3s ease;
}
.avatar-icon.upload:hover {
    color: rgb(118, 206, 162);
    background-color: rgba(133, 133, 133, 0.25);
    transition: all .3s ease;
}
.avatar-icon.reset {
    color: rgb(255, 156, 156);
    transition: all .3s ease;
}
.avatar-icon.reset:hover {
    color: rgb(238, 129, 129);
    background-color: rgba(133, 133, 133, 0.25);
    transition: all .3s ease;
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