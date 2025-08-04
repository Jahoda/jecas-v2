---
title: "Jak funguje TanStack Query"
headline: "Jak funguje TanStack Query"
description: "TanStack Query elegantně řeší práci s daty stahovanými přes API."
date: "2025-01-18"
last_modification: "2025-01-18"
status: 1
tags: ["JavaScript", "Frameworky", "Rady a nápady"]
---

U webové aplikace napojené na API dokáže [TanStack Query](https://tanstack.com) (dříve React Query) výrazně **zpříjemnit uživatelský i vývojářský zážitek**.

Jde použít jako mezivrstvu mezi zobrazením dat a stávajícím řešením pro jejich stahování – ať už se používá obyčejný [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch), knihovna typu [Axios](https://axios-http.com/docs/intro) nebo třeba nějaký GraphQL klient.

## Invalidace dat

Asi hlavní výhoda je invalidace starých dat.

Když u složitější aplikace uživatel něco změní, může být problém to promítnout na všechna místa.

TanStack Query funguje tak, že se každé specifické volání označí **unikátním klíčem** (`queryKey`):

```
const query = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos
})
```

Do `queryFn` se nastaví funkce pro získání dat, která vrací [promisu](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

V návaznosti na nějakou akci (změnu dat) se následně volá invalidace:

```
const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: ['todos'] })
```

Vývojář tak vůbec nemusí řešit, kde se co má obnovit, ale TanStack Query to vyřeší.

## Cache

Zároveň jsou data ukládána do cache. To znamená, že odpadá nějaké složité předávání dat napříč komponentami, aby se šetřily HTTP requesty.

Každá komponenta si klidně může sahat znovu a znovu pro data, ale TanStack Query zajistí, že se **nic zbytečně stahovat nebude**.

Zde je užitečné si vytvářet znovupoužitelné funkce, např.

```
export function getTodosQueryKey() {
  return ['todos'] 
}

export function useTodosQuery() {
  return useQuery({
    queryKey: getTodosQueryKey(),
    queryFn: getTodos
  })
}
```

Na potřebném místě tak stačí jen:

```
const query = useTodosQuery()
```

A pro invalidaci něco jako:

```
const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: getTodosQueryKey() })
```

A je krásně vyřešena konsistence napříč celou aplikací.

### Invalidace cache

Kromě ruční invalidace se ve výchozím stavu obnovují data i při znovuaktivování okna prohlížeče a obnovení internetového připojení.

Je možné si i nastavit čas, po kterém se mají data automaticky obnovit, pouhým nastavením vlastnosti `refetchInterval`.

TanStack Query se zde chová navíc chytře a porovnává v JSON datech, jestli došlo k nějaké změně. A pokud ne, tak se nic nedělá. Obnova dat tak ve většině případů **nemá viditelný negativní dopad** na uživatele.

## Znázornění stavů

Aplikace potřebuje znázorňovat stav načítání.

To se řeší tak, že v `query` objektu existují vlastnosti `data`, `isPending`, `isSuccess`, `isError` a další:

```
if (query.isPending) {
  return &lt;span>Načítání&lt;/span>
}

if (query.isError) {
  return &lt;span>Chyba: {error.message}&lt;/span>
}

return (
  &lt;ul>
    {query.data.map((todo) => (
      &lt;li key={todo.id}>{todo.title}&lt;/li>
    ))}
  &lt;/ul>
)
```

## Ruční úprava dat

Hodně zajímavá je možnost nastavit pro daný `queryKey` data ručně.

To se typicky může hodit třeba při přechodu z výpisu na detail položky, kde je většina dat z detailu stažena už ve výpisu.

Takže může být zajímavé tato data přes `initialData` nastavit jako *základ*:

```
const result = useQuery({
  queryKey: ['todo', todoId],
  queryFn: () => fetch(`/todos/${todoId}`),
  initialData: () => {
    return queryClient.getQueryData(['todos'])?.find((d) => d.id === todoId)
  },
})
```

TanStack Query stáhne i opravdová data detailu, ale uživatel do té doby může vidět alespoň ten základ z výpisu a aplikace tak reaguje okamžitě.

Kromě nastavení výchozích dat jde ručně nastavovat i *skutečná* data daného klíče:

```
queryClient.setQueryData(['todo', { id: variables.id }], data)
```

To jde rozumně využít například u endpointů pro ukládání dat. Pokud takové volání skončí úspěchem, mohou se tato data rovnou nastavit do potřebného query klíče, aniž by se musel znovu volat endpoint pro čtení dat.

## Optimistické updaty

Pokročilejší technika jsou **optimistické updaty**. O co jde? Aplikace spoléhá na to, že se akci povede dokončit. Jsou-li dobře vyřešené validace na straně klienta, není moc reálně důvod, že by volání API mělo skončit chybou.

Takže se ihned po vyvolání akce uživatelem nastaví do query klíčů očekávaná data. Zároveň se zavolá API pro danou akci. A mohou nastat dva případy:

    Akce skončí **úspěšně** – nic se nemusí dělat.

    Akce skončí **chybou** – data se vrátí do předchozího stavu a zobrazí se chyba.

Používají se k tomu mutace, na které lze navěsit obslužnou logiku. Kód [optimistických updatů](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates) už je trochu komplikovanější:

```
useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Zrušíme probíhající refetch,
    // aby nepřepsal naši optimistickou změnu
    await queryClient.cancelQueries({ queryKey: ['todos', newTodo.id] })

    // Uložíme si předchozí hodnotu
    const previousTodo = queryClient.getQueryData(['todos', newTodo.id])

    // Optimisticky nastavíme novou hodnotu
    queryClient.setQueryData(['todos', newTodo.id], newTodo)

    // Vrátíme kontext s předchozími i novými daty
    return { previousTodo, newTodo }
  },
  // Pokud mutace selže, vrátíme se k předchozímu stavu
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(
      ['todos', context.newTodo.id],
      context.previousTodo
    )
  },
  // Po úspěchu i neúspěchu (onSettled) provedeme refetch:
  onSettled: (newTodo) => {
    queryClient.invalidateQueries({ queryKey: ['todos', newTodo.id] })
  },
})
```

Je potřeba si rozmyslet, jestli to za to stojí.

    U **závazných akcí** to nemusí být úplně dobré řešení. Třeba u tlačítka pro dokončení objednávky.

    Pokud API **odpovídá velmi rychle**, třeba desítky milisekund, přínos nebude moc velký.

## Kombinované query

Přes `combine` jde spojit data z více *queries* do jedné.

```
const ids = [1, 2, 3]
const combinedQueries = useQueries({
  queries: ids.map((id) => ({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
  })),
  combine: (results) => {
    return {
      data: results.map((result) => result.data),
      pending: results.some((result) => result.isPending),
    }
  },
})
```

To se hodí hlavně v případě, že kdy je problematické přizpůsobit API požadavkům na frontendu.

Jde si tak celkem šikovně poskládat data z více API volání do jedné datové struktury.

Typický případ je napojování číselníků na ID. Jde si souběžně stáhnout všechna data, v `combine` je spojit dohromady a dál s nimi už pracovat jako s jedním celkem.

## Integrace do JS frameworků

Kromě používání v čistém JS existují přímo napojení pro React, Solid, Vue, Svelte a Angular.

Není tedy problém TanStack Query zapojit do libovolného projektu. A není potřeba kvůli tomu přepisovat celou aplikaci. Jde s tím začít i postupně.

TanStack Query je poměrně rozšířený a existuje pro něj mnoho nástrojů. Dost zajímavé jsou různé generátory, které dokáží z API specifikace rovnou vytvořit hotové funkce pro volání API, které automaticky TanStack Query používají *na pozadí*.

      TanStack Query:
      [Community Projects](https://tanstack.com/query/latest/docs/framework/react/community/community-projects)