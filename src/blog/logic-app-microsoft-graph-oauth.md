---
title: Logic Apps Active Directory OAuth Authentication for Microsoft Graph
published: true
description: Logic Apps Active Directory OAuth Authentication for Microsoft Graph
tags: #azure #integration #logicapps #microsoftgraph
date: '2018-04-01'
canonicalURL: 'https://lfalck.se/logic-app-microsoft-graph-oauth'
---
Using the Microsoft Graph REST API in a Logic App is a nice way of creating integrations that work with Azure Active Directory. There are instructions how to use the API with Active Directory OAuth Authentication [here](https://developer.microsoft.com/en-us/graph/docs/concepts/auth_v2_service), but they do not map directly to the built in authentication in Logic Apps, so i thought i would share what worked for me. This example queries the API for users but it should work with any Microsoft Graph query given the right permissions.

To use Active Directory OAuth Authentication in a Logic App we need to create an Application Registration. There are two ways to do this, in the Azure portal or in the new [Application Registration Portal](https://apps.dev.microsoft.com) for Azure Active Directory v2.0. Both will work for Microsoft Graph, but be aware that Azure Active Directory v2.0 is still in development, so not all APIs are available in the new portal. You can read more [here](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-appmodel-v2-overview).

[//]: # (The new portal supports Microsoft accounts, so a developer without access to the Azure portal will still be able to use it.)

#####1a. Register your application in the Azure portal

1. Login to the [Azure Portal](https://portal.azure.com) and go to Azure Active Directory. 
2. Go to **App Registrations** and click **New application registration**.
3. Enter a name, choose "Webb app / API" as Application type and enter a Redirect URL, e.g. https//localhost/myapp. 
4. Click **Settings** in the newly created application and go to **Required permissions**. Add the application permission "Read directory data" for Microsoft Graph.
6. Go to **Keys**, generate a new key and store the output somewhere secure.
7. If you are an Azure Active Directory administrator, you can click **Grant Permissions** directly, otherwise you need to ask an admin to do it.

#####1b. Register your application in the Application Registration Portal

1. Go to the [Application Registration Portal](https://apps.dev.microsoft.com) and create a new application by clicking **Add an app**. 
2. Click **Generate New Password** and store the output somewhere secure.
3. Click **Add Platform**, choose Web and enter a Redirect URL, e.g. https//localhost/myapp. 
4. Scroll down to **Microsoft Graph Permissions** and add the application permission "Directory.Read.All". 
4. Click save on the bottom of the page.
5. Create a link with the following format and send to an administrator for consent, or open it yourself if you are an admin:
`https://login.microsoftonline.com/{Directory ID from Azure Active Directory > Properties}/adminconsent?client_id={Application ID from Application Registration}&redirect_uri={Redirect URL from Application Registration}`

#####2. Use the application in your Logic App  
In an HTTP action, use https://graph.microsoft.com/v1.0/users as URI and enter the following values after clicking **Show advanced options**:
<div style="overflow-x:auto;">
 <table>
  <tr>
    <th>Authentication</td>
    <td>Active Directory OAuth</td>
  </tr>
  <tr>
    <th>Authority</td>
    <td>https://login.windows.net (default)</td>
  </tr>
   <tr>
    <th>Tenant</td>
    <td>Directory ID from Azure Active Directory > Properties</td>
  </tr>
  <tr>
    <th>Audience</td>
    <td>https://graph.microsoft.com/</td>
  </tr>
  <tr>
    <th>Client ID</td>
    <td>Application ID from the Application Registration</td>
  </tr>
  <tr>
    <th>Secret</td>
    <td>Key/password from the Application Registration</td>
  </tr>
</table> 
</div>
The Logic App should now be able to fetch users from your Azure Active Directory.

Another possibility which might make this even easier is the [HTTP with Azure AD connector](https://docs.microsoft.com/en-us/connectors/webcontents/) which is currently in preview. I could not get it to work properly for my use case, but i will check it out again when it is out of preview.

Thanks to [Mattias Lögdberg](http://mlogdberg.com) for the help and to [NBajanca on Stackoverflow](https://stackoverflow.com/questions/42960959/authorization-identitynotfound-on-microsoft-graph-api-request/) for pointing out that the not so obvious fact that you need the Directory.Read.All and not User.Read.All permission to query users.

That is all, have a good day!