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
        ...mapActions(["showMessage"]),

        messageDisplay(desc, status = "danger", title = "") {
            this.showMessage({
                title: title,
                desc: desc,
                status: status,
                autoClose: {
                    enabled: true
                }
            })
        },

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

        getDocumentServerUrl() {
            return axios({
                        method: "GET",
                        url: this.configuration.server + "ocs/v2.php/apps/onlyoffice/api/v1/settings/docserver",
                        headers: {
                            authorization: "Bearer " + this.getToken
                        }
                    })
                    .then(response => response.data)
                    .catch(error => {
                        console.error(error);
                    })

        }
    },

    computed: {
        ...mapGetters(["getToken"]),
        ...mapGetters(["configuration"]),
        ...mapGetters(["apps"]),
    },

    mounted() {
        this.getDocumentServerUrl()
        .then((data) => {
            if (data.documentServerUrl) {
                let iframeEditor = document.getElementById("iframeEditor");
                let docApi = document.createElement("script");

                docApi.setAttribute("src", data.documentServerUrl + "web-apps/apps/api/documents/api.js");
                iframeEditor.appendChild(docApi);

                axios({
                    method: "GET",
                    url: this.configuration.server + "ocs/v2.php/apps/onlyoffice/api/v1/config/" + this.fileId,
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
            } else {
                this.messageDisplay("ONLYOFFICE app is not configured. Please contact admin");
                this.onRequestClose();
            }
        })
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