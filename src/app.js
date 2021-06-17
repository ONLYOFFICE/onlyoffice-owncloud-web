import Editor from "./editor.vue"
import axios from "axios"

const routes = [
    {
      path: "/editor/:fileId",
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
          handler: create,
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
          handler: create,
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
          handler: create,
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

function create({ config, extensionConfig, filePath, fileId, mode }) {
  if (mode != "create") {
    openEditor(config, fileId, filePath);
    return;
  }

  axios({
    method: "GET",
    url: config.server + "ocs/v2.php/apps/onlyoffice/api/v1/empty/" + fileId,
    headers: {
        authorization: "Bearer " + JSON.parse(sessionStorage.getItem("webStateInSessionStorage")).user.token
    }
  })
  .then(response => {
    if (response.error) {
      console.error(error);
      return;
    }
    openEditor(config, fileId, filePath);
  })
  .catch(error => {
      console.error(error);
  })
}

function openEditor(config, fileId, filePath) {
  let url = `${window.location.origin}/index.html#/onlyoffice/editor/${fileId}?filePath=${encodeURIComponent(filePath)}`;
  if (`${window.location.origin}/` === config.server) {
    url = url.replace(window.location.origin, config.server + "index.php/apps/web")
  }

  location.href = url;
}

export default {
    appInfo,
    routes
};