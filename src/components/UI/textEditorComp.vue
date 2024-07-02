<!-- <template>
    <div>
        <Editor 
        @update:modelValue="(value) => emit('update:modelValue', value)" 
        :modelValue="props.modelValue" 
        editorStyle="height: 320px" 
        />
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        required: false,
    }
})
const emit = defineEmits(['update:modelValue']);

</script>

<style scoped>
    
</style> -->

<template>
    <div>
      <div id="editor-container"></div>
      <button @click="saveContent">Сохранить</button>
      <button @click="insertContent">Insert</button>
    </div>
  </template>
  
  <script>
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';
  
  export default {
    data() {
        return {
            quill: null,
            template: '',
        };
    },
    mounted() {
        this.initializeQuill();
    },
    methods: {
    initializeQuill() {
        this.quill = new Quill('#editor-container', {
            theme: 'snow',
            modules: {
                toolbar: true,
            },
            placeholder: 'Enter a description',
            theme: 'snow',
        });
    },
    saveContent() {
        const text = this.quill.getText(0);
        const html = this.quill.getSemanticHTML(0);
        console.log(text);
        console.log('html', html)
    },
    insertContent() {
        this.quill.insertEmbed(0, 'html', '<h1 class="ql-align-center">Second Project!!!</h1><h2 class="ql-align-center"><span style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);">description example</span></h2><p class="ql-align-center"><a href="http://localhost:3333" rel="noopener noreferrer" target="_blank" style="background-color: rgb(102, 163, 224); color: rgb(255, 255, 255);">http://localhost:3333</a></p>');
    }
  }
}
</script>

<style>
#editor-container {
    height: 300px;
}
</style>