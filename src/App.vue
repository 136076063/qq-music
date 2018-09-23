<template>
    <div id="app">
        <Header></Header>
        <Tab></Tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
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
