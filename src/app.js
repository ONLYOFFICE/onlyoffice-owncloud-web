/**
 *
 * (c) Copyright Ascensio System SIA 2023
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

import Editor from "./editor.vue";

const routes = [
    {
      path: "/editor/:fileId/:filePath/:mode",
      components: {
        fullscreen: Editor
      },
      name: "editor",
      meta: { hideHeadbar: true }
    }
];

const appInfo = {
    name: "ONLYOFFICE",
    id: "onlyoffice",
    icon: "x-office-document",
    isFileEditor: true,
    extensions: [
        {
          extension: "docx",
          routeName: "onlyoffice-editor",
          newTab: true,
          newFileMenu: {
            menuTitle ($gettext) {
              return $gettext("Document")
            },
            icon: "x-office-document"
          },
          routes: [
            "files-spaces-generic",
            "files-common-favorites",
            "files-shares-with-others",
            "files-shares-with-me",
            "files-trash-generic",
            "files-public-link"
          ]
        },
        {
          extension: "xlsx",
          routeName: "onlyoffice-editor",
          newTab: true,
          newFileMenu: {
            menuTitle ($gettext) {
              return $gettext("Spreadsheet")
            },
            icon: "x-office-spreadsheet"
          },
          routes: [
            "files-spaces-generic",
            "files-common-favorites",
            "files-shares-with-others",
            "files-shares-with-me",
            "files-trash-generic",
            "files-public-link"
          ]
        },
        {
          extension: "pptx",
          routeName: "onlyoffice-editor",
          newTab: true,
          newFileMenu: {
            menuTitle ($gettext) {
              return $gettext("Presentation")
            },
            icon: "x-office-presentation"
          },
          routes: [
            "files-spaces-generic",
            "files-common-favorites",
            "files-shares-with-others",
            "files-shares-with-me",
            "files-trash-generic",
            "files-public-link"
          ]
        }
      ]
};

export default {
    appInfo,
    routes
};
