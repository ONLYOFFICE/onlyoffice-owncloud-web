import Editor from "./editor.vue"

const routes = [
    {
      path: "/editor/:fileId",
      components: {
        fullscreen: Editor
      },
      name: "editor",
      meta: { hideHeadbar: true }
    }
  ]

const appInfo = {
    name: "onlyoffice",
    id: "onlyoffice",
    icon: "x-office-document",
    isFileEditor: true,
    extensions: [
        {
          extension: "docx",
          handler: function ({ config, extensionConfig, filePath, fileId }) {
            window.open(
              `${window.location.origin}/index.html#/onlyoffice/editor/${fileId}?filePath=${encodeURIComponent(filePath)}`,
              "_self"
            )
          },
          newFileMenu: {
            menuTitle ($gettext) {
              return $gettext("New OnlyOffice document")
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
          handler: function ({ config, extensionConfig, filePath, fileId }) {
            window.open(
              `${window.location.origin}/index.html#/onlyoffice/editor/${fileId}?filePath=${encodeURIComponent(filePath)}`,
              "_self"
            )
          },
          newFileMenu: {
            menuTitle ($gettext) {
              return $gettext("New OnlyOffice spreadsheet")
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
          handler: function ({ config, extensionConfig, filePath, fileId }) {
            window.open(
              `${window.location.origin}/index.html#/onlyoffice/editor/${fileId}?filePath=${encodeURIComponent(filePath)}`,
              "_self"
            )
          },
          newFileMenu: {
            menuTitle ($gettext) {
              return $gettext("New OnlyOffice presentation")
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
}

export default {
    appInfo,
    routes
}