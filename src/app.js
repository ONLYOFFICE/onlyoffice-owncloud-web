import Editor from "./editor.vue"

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
    name: "onlyoffice",
    id: "onlyoffice",
    icon: "x-office-document",
    isFileEditor: true,
    extensions: [
        {
          extension: "docx",
          routeName: "onlyoffice-editor",
          newFileMenu: {
            menuTitle ($gettext) {
              return $gettext("Document")
            },
            icon: "x-office-document"
          },
          routes: [
            "files-personal",
            "files-favorites",
            "files-shared-with-others",
            "files-shared-with-me",
            "files-public-list"
          ]
        },
        {
          extension: "xlsx",
          routeName: "onlyoffice-editor",
          newFileMenu: {
            menuTitle ($gettext) {
              return $gettext("Spreadsheet")
            },
            icon: "x-office-spreadsheet"
          },
          routes: [
            "files-personal",
            "files-favorites",
            "files-shared-with-others",
            "files-shared-with-me",
            "files-public-list"
          ]
        },
        {
          extension: "pptx",
          routeName: "onlyoffice-editor",
          newFileMenu: {
            menuTitle ($gettext) {
              return $gettext("Presentation")
            },
            icon: "x-office-presentation"
          },
          routes: [
            "files-personal",
            "files-favorites",
            "files-shared-with-others",
            "files-shared-with-me",
            "files-public-list"
          ]
        }
      ]
};

export default {
    appInfo,
    routes
};