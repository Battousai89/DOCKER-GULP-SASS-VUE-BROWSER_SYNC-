<template>
    <div class="hello">{{ greeting }} <span><slot></slot></span>!</div>
</template>

<script>
    export default {
        data() {
            return {
                greeting: 'Hello'
            }
        }
    };
</script>

<style lang="less">
    .hello {
        color: red;
        
        span {
            color: blue;
        }
    }
</style>