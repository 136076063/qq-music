<template>
    <div id="app">
        <Header></Header>
        <Tab></Tab>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import Header from 'components/header/header.vue';
    import Tab from 'components/pages/tab.vue';
    export default {
        components: {
            Header,
            Tab
        }
    };
</script>
