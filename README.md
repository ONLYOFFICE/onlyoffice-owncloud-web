# ownCloud Web ONLYOFFICE integration app

This app allows integrating ONLYOFFICE Docs (packaged as Document Server) with ownCloud with new user interface called ownCloud Web. 

## Features

The app allows to:

* Create and edit text documents, spreadsheets, and presentations in docx, xlsx, pptx formats
* Edit and co-edit docx, xlsx, pptx

## Installing ONLYOFFICE Docs

You will need an instance of ONLYOFFICE Docs (Document Server) that is resolvable and connectable both from ownCloud and any end clients. ONLYOFFICE Document Server must also be able to POST to ownCloud directly.

ONLYOFFICE Document Server and ownCloud can be installed either on different computers, or on the same machine. 

If you use one machine, set up a custom port for Document Server as by default both ONLYOFFICE Document Server and ownCloud work on port 80.

You can install free [Community version of ONLYOFFICE Docs](https://helpcenter.onlyoffice.com/installation/docs-community-index.aspx) or scalable [Enterprise Edition with pro features](https://helpcenter.onlyoffice.com/installation/docs-enterprise-index.aspx).

## Installing connector for ownCloud Web

You will need:
* [ownCloud server v10.7](https://owncloud.com/download-server/#owncloud-server) with ownCloud Web (it can be compiled from source code or installed from the [official marketplace](https://marketplace.owncloud.com/apps/web).


