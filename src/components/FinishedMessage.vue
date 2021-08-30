<template>
<div v-show="step == 3">
    <h1>Done.</h1>
</div>  
</template>

<script>
export default {
    name:'DoneMessage',
    props: {
        step:{
            type:Number,
            required:true
        }
    }
}
</script>