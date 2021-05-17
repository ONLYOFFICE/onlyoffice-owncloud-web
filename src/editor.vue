<template>
  <main>
    <div id="app">
        <div id="iframeEditor" />
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import axios from "axios"

export default {
    data: () => ({
        fileId: null,
        filePath: null,
        config: null,
        docEditor: null
    }),

    created() {
        this.fileId = this.$route.params.fileId;
        this.filePath = this.$route.query.filePath;

    },

    methods: {
        onRequestClose() {
            let params = {item: null};
            let filePath = this.filePath.split("/");
            filePath.shift();
            filePath.pop();
            
            if (filePath.length > 0) {
                params.item = filePath.join("/");
            }

            this.$router.push({name: "files-personal", params});
        },
    },

    computed: {
        ...mapGetters(["getToken"]),
        ...mapGetters(["configuration"]),
        ...mapGetters(["apps"]),
    }, 

    mounted() {
        let iframeEditor = document.getElementById("iframeEditor");
        let docApi = document.createElement("script");
        let documentServerUrl = this.apps.onlyoffice.config.documentServerUrl;

        docApi.setAttribute("src", documentServerUrl + "web-apps/apps/api/documents/api.js");
        iframeEditor.appendChild(docApi);

        axios({
            method: "GET",
            url: this.configuration.server + "index.php/apps/onlyoffice/ajax/config/" + this.fileId,
            headers: {
                authorization: "Bearer " + this.getToken
            }
        })
            .then(response => {
                this.config = response.data;

                let events = [];
                events["onRequestClose"] = this.onRequestClose;

                this.config.editorConfig.customization.goback.requestClose = true;

                this.config.events = events;
                this.docEditor = new DocsAPI.DocEditor("iframeEditor", this.config);
            });
  }
}
</script>

<style>
    #app {
        width: 100%;
    }
    #app > iframe {
        position: absolute;
    }
</style>