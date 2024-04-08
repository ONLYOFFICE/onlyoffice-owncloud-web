/**
 *
 * (c) Copyright Ascensio System SIA 2024
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

<template>
  <main>
    <div id="app">
        <div id="iframeEditor" />
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
    data: () => ({
        mode: "edit",
        fileId: null,
        filePath: null,
        config: null,
        docEditor: null
    }),

    created() {
        this.mode = this.$route.params.mode;
        this.fileId = this.$route.params.fileId;
        this.filePath = this.$route.params.filePath;

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
            let params = {driveAliasAndItem: null};

            if (this.currentFolder) {
                params.driveAliasAndItem = "personal/" + this.currentFolder.ownerId + this.currentFolder.path;
            }

            this.$router.push({name: "files-spaces-generic", params});
        },

        getDocumentServerUrl() {
            return axios({
                        method: "GET",
                        url: this.configuration.server + "ocs/v2.php/apps/onlyoffice/api/v1/settings/docserver",
                        headers: {
                            authorization: "Bearer " + this.getToken
                        }
                    })
                    .then(response => {
                        if (!response.data.documentServerUrl) {
                            throw("ONLYOFFICE app is not configured. Please contact admin");
                        }

                        return response.data.documentServerUrl;
                    })

        },

        create() {
            return new Promise((resolve, reject) => {
                if (this.mode != "create") {
                    resolve();
                    return;
                }

                axios({
                        method: "GET",
                        url: this.configuration.server + "ocs/v2.php/apps/onlyoffice/api/v1/empty/" + this.fileId,
                        headers: {
                            authorization: "Bearer " + this.getToken
                        }
                    })
                    .then(response => {
                        if (response.data.error) {
                            reject(response.data.error);
                            return;
                        }

                        resolve();
                    })
            })
        },

        initConfig() {
            return axios({
                        method: "GET",
                        url: this.configuration.server + "ocs/v2.php/apps/onlyoffice/api/v1/config/" + this.fileId,
                        headers: {
                            authorization: "Bearer " + this.getToken
                        }
                    })
                    .then(response => {
                        if (response.data.error) {
                            throw(response.data.error);
                        }

                        this.config = response.data;

                        let events = [];
                        events["onRequestClose"] = this.onRequestClose;

                        this.config.editorConfig.customization.goback.requestClose = true;

                        this.config.events = events;
                        this.docEditor = new DocsAPI.DocEditor("iframeEditor", this.config);
                    });
        }
    },

    computed: {
        ...mapGetters(["getToken", "configuration", "apps"]),
        ...mapGetters("Files", ["currentFolder"]),
    },

    mounted() {
        this.create()
        .then(() => {
            return this.getDocumentServerUrl();
        })
        .then((documentServerUrl) => {
            let iframeEditor = document.getElementById("iframeEditor");
            let docApi = document.createElement("script");

            docApi.setAttribute("src", documentServerUrl + "web-apps/apps/api/documents/api.js");
            iframeEditor.appendChild(docApi);

            return this.initConfig();
        })
        .catch((error) => {
            this.messageDisplay(error);
            this.onRequestClose();
        })
    }
}
</script>

<style>
    #app {
        width: 100%;
    }
    #app > iframe {
        position: fixed;
        height: calc(100vh - 52px);
        right: 0;
    }
</style>