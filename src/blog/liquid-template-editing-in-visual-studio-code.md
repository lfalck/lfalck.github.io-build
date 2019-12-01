---
title: Liquid Template editing in Visual Studio Code
published: true
description: Liquid Template editing in Visual Studio Code
tags: #azure #integration #liquid #logicapps #apimanagement
date: '2018-09-24'
canonicalURL: 'https://lfalck.se/liquid-template-editing-in-visual-studio-code'
---

Visual Studio Code has excellent support for creating Liquid Templates for Azure API Management or Logic Apps. With the right extensions it can provide both code completion and a live preview which displays the output of your template while you are editing it. With a split editor you can see both the input, the transform and the output at the same time.

![Liquid Template editing in Visual Studio Code](https://www.dropbox.com/s/pxg6vnh2hwd3e7d/vscode-liquid.png?raw=1)

#####Getting started

1. Install the following extensions:  
[**Liquid Languages Support**](https://marketplace.visualstudio.com/items?itemName=neilding.language-liquid)  
[**Shopify Liquid Preview**](https://marketplace.visualstudio.com/items?itemName=kirchner-trevor.shopify-liquid-preview)  
[**Shopify Liquid Template Snippets**](https://marketplace.visualstudio.com/items?itemName=killalau.vscode-liquid-snippets)  
2. Name the template file *yourname.liquid* and the input file *yourname.liquid.json*
3. For Azure API Management, enclose your JSON in a "body" object. For Logic Apps, use a "content" object
4. Run (Ctrl+Shift+P) "Shopify Liquid: Open Preview to the Side (Plaintext)"
5. Run (Ctrl+Shift+P) "Change Language Mode" when selecting the output and choose e.g. XML or JSON to get color coding 

These extensions use the original [Shopify Liquid](https://github.com/Shopify/liquid) while Microsoft uses the .NET port [DotLiquid](https://github.com/dotliquid/dotliquid) which has some differences. The main one is that the first letter of filters are lower case in the original version and defaults to upper case in DotLiquid, so before using the template somewhere like API Management we need to convert the case. If there are more than a few filters you might want to use this RegEx method:

1. Find (Ctrl+F): \| (\S)
2. Make sure "Use Regular Expression" is enabled (Alt+R)
3. Select All Occurrences of Find Match (Alt+Enter)
5. Run (Ctrl+Shift+P): "Transform to uppercase"

That is all, have a good day!