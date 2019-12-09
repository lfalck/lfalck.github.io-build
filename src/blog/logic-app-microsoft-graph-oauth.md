---
title: Logic Apps Active Directory OAuth Authentication for Microsoft Graph
published: true
description: Logic Apps Active Directory OAuth Authentication for Microsoft Graph
tags: #azure #integration #logicapps #microsoftgraph
date: '2018-04-01'
canonicalURL: 'https://lfalck.se/logic-app-microsoft-graph-oauth'
---
Using the Microsoft Graph REST API in a Logic App is a nice way of creating integrations that work with Azure Active Directory. There are instructions how to use the API with Active Directory OAuth Authentication [here](https://docs.microsoft.com/en-us/graph/auth-v2-service), but they do not map directly to the built in authentication in Logic Apps, so i thought i would share what worked for me. This example queries the API for users but it should work with any Microsoft Graph query given the right permissions.

##1. Register your application in the Azure portal

1. Login to the [Azure Portal](https://portal.azure.com) and go to Azure Active Directory. 
2. Go to **App Registrations** and click **New registration**.
3. Enter a name and click register, leave other options as default.
4. Click **View API Permissions**, then **Add a permission** .
5. Choose **Microsoft Graph**, select **Application permissions** and add "Directory.Read.All".
6. Go to **Certificates & secrets**, generate a new client secret and store the output somewhere secure.
7. If you are an Azure Active Directory administrator, you can click **Grant admin consent for (your organization)** directly, otherwise you need to ask an admin to do it.

##2. Use the application in your Logic App  
In an HTTP action, use https://graph.microsoft.com/v1.0/users as URI and enter the following values after selecting **Active Directory OAuth** under **Authentication** (Authority needs to be added by clicking "Add new parameter").

|                      |                                                                        |
| -------------------- | ---------------------------------------------------------------------- |
|  **Authority**       |  https://login.windows.net                                             |
|  **Tenant**          |  Directory ID from the Application Registration                        |
|  **Audience**        |  https://graph.microsoft.com/                                          |
|  **Client ID**       |  Application ID from the Application Registration                      |
|  **Secret**          |  Client secret from the Application Registration                       |

Registration might take a moment, but the Logic App should then be able to fetch users from your Azure Active Directory.

Thanks to [Mattias Lögdberg](http://mlogdberg.com) for the help and to [NBajanca on Stackoverflow](https://stackoverflow.com/questions/42960959/authorization-identitynotfound-on-microsoft-graph-api-request/) for pointing out that you need the **Directory.Read.All** and not **User.Read.All** permission to query users.

That is all, have a good day!

*Updated 2019-12-09 to use [the new App registrations experience in the Azure portal](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-registrations-training-guide-for-app-registrations-legacy-users).*
