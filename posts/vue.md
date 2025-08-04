---
title: "Vue.js"
headline: "Vue.js"
description: ""
date: "2020-03-02"
last_modification: "2020-03-02"
status: 0
tags: []
---

## Model `v-model`

```
&lt;input v-model="hodnota">
Hodnota políčka je: {{ hodnota }}
```

Ekvivalentní zápis je:

```
&lt;input
  v-bind:value="hodnota"
  v-on:input="hodnota = $event.target.value"
>
```

## Podmínky

Pro podmínky existují atributy `v-if`, `v-else` a `v-else-if`:

```
&lt;div v-if="neco === 'A'">
  A
&lt;/div>
&lt;div v-else-if="neco === 'B'">
  B
&lt;/div>
&lt;div v-else>
  Něco jiného
&lt;/div>
```

Lze je používat i na značku `&lt;template>`, pokud není potřeba mít v DOMu další element.

### „Podmínka“ `v-show`

Zvláštní případ podmínky je atribut `v-show`, ten (ne)zobrazuje element změnou CSS.

Podmínky `v-if`, `v-else` a `v-else-if` způsobují skutečnou změnu DOMu.

Z toho plyne poučka pro rozhodování mezi `v-if` a `v-show`:

Skrývání/odkrývání je rychlejší přes `v-show` (nemusí se vyměňovat elementy v DOMu.)

Prvotní vykreslení je rychlejší s `v-if`, protože se nemusí vytvořit část DOMu s neviditelnými elementy.

Z toho plyne nefunkčnost podmínky `v-show` u značky `&lt;template>`, protože se tato značka při buildu zahazuje.

## Validace formulářů

## Jaký editor pro Vue.js použít

### VS Code

Pluginy:

        [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

        [VueDX](https://marketplace.visualstudio.com/items?itemName=znck.vue-language-features)

        [Vue 3](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)