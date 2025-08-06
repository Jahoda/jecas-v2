---
title: "Jak funguje TanStack Query"
headline: "Jak funguje TanStack Query"
description: "TanStack Query elegantně řeší práci s daty stahovanými přes API."
date: "2025-01-18"
last_modification: "2025-01-18"
status: 1
tags: ["js", "knihovny", "napady"]
format: "html"
---

<p>U webové aplikace napojené na API dokáže <a href="https://tanstack.com">TanStack Query</a> (dříve React Query) výrazně <b>zpříjemnit uživatelský i vývojářský zážitek</b>.</p>

<p>Jde použít jako mezivrstvu mezi zobrazením dat a stávajícím řešením pro jejich stahování – ať už se používá obyčejný <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch"><code>fetch</code></a>, knihovna typu <a href="https://axios-http.com/docs/intro">Axios</a> nebo třeba nějaký GraphQL klient.</p>


<h2 id="invalidace-dat">Invalidace dat</h2>

<p>Asi hlavní výhoda je invalidace starých dat.</p>

<p>Když u složitější aplikace uživatel něco změní, může být problém to promítnout na všechna místa.</p>

<p>TanStack Query funguje tak, že se každé specifické volání označí <b>unikátním klíčem</b> (<code>queryKey</code>):</p>


<pre><code>const query = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos
})</code></pre>






<p>Do <code>queryFn</code> se nastaví funkce pro získání dat, která vrací <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">promisu</a>.</p>

<p>V návaznosti na nějakou akci (změnu dat) se následně volá invalidace:</p>

<pre><code>const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: ['todos'] })</code></pre>




<p>Vývojář tak vůbec nemusí řešit, kde se co má obnovit, ale TanStack Query to vyřeší.</p>


<h2 id="cache">Cache</h2>

<p>Zároveň jsou data ukládána do cache. To znamená, že odpadá nějaké složité předávání dat napříč komponentami, aby se šetřily HTTP requesty.</p>

<p>Každá komponenta si klidně může sahat znovu a znovu pro data, ale TanStack Query zajistí, že se <b>nic zbytečně stahovat nebude</b>.</p>

<p>Zde je užitečné si vytvářet znovupoužitelné funkce, např.</p>

<pre><code>export function getTodosQueryKey() {
  return ['todos'] 
}

export function useTodosQuery() {
  return useQuery({
    queryKey: getTodosQueryKey(),
    queryFn: getTodos
  })
}</code></pre>















<p>Na potřebném místě tak stačí jen:</p>

<pre><code>const query = useTodosQuery()</code></pre>

<p>A pro invalidaci něco jako:</p>

<pre><code>const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: getTodosQueryKey() })</code></pre>







<p>A je krásně vyřešena konsistence napříč celou aplikací.</p>






<h3 id="invalidace-cache">Invalidace cache</h3>

<p>Kromě ruční invalidace se ve výchozím stavu obnovují data i při znovuaktivování okna prohlížeče a obnovení internetového připojení.</p>



<p>Je možné si i nastavit čas, po kterém se mají data automaticky obnovit, pouhým nastavením vlastnosti <code>refetchInterval</code>.</p>

<p>TanStack Query se zde chová navíc chytře a porovnává v JSON datech, jestli došlo k nějaké změně. A pokud ne, tak se nic nedělá. Obnova dat tak ve většině případů <b>nemá viditelný negativní dopad</b> na uživatele.</p>


<h2 id="stavy">Znázornění stavů</h2>

<p>Aplikace potřebuje znázorňovat stav načítání.</p>

<p>To se řeší tak, že v <code>query</code> objektu existují vlastnosti <code>data</code>, <code>isPending</code>, <code>isSuccess</code>, <code>isError</code> a další:</p>

<pre><code>if (query.isPending) {
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
)</code></pre>





















<h2 id="uprava-dat">Ruční úprava dat</h2>

<p>Hodně zajímavá je možnost nastavit pro daný <code>queryKey</code> data ručně.</p>

<p>To se typicky může hodit třeba při přechodu z výpisu na detail položky, kde je většina dat z detailu stažena už ve výpisu.</p>

<p>Takže může být zajímavé tato data přes <code>initialData</code> nastavit jako <i>základ</i>:</p>

<pre><code>const result = useQuery({
  queryKey: ['todo', todoId],
  queryFn: () => fetch(`/todos/${todoId}`),
  initialData: () => {
    return queryClient.getQueryData(['todos'])?.find((d) => d.id === todoId)
  },
})</code></pre>











<p>TanStack Query stáhne i opravdová data detailu, ale uživatel do té doby může vidět alespoň ten základ z výpisu a aplikace tak reaguje okamžitě.</p>


<p>Kromě nastavení výchozích dat jde ručně nastavovat i <i>skutečná</i> data daného klíče:</p>

<pre><code>queryClient.setQueryData(['todo', { id: variables.id }], data)</code></pre>


<p>To jde rozumně využít například u endpointů pro ukládání dat. Pokud takové volání skončí úspěchem, mohou se tato data rovnou nastavit do potřebného query klíče, aniž by se musel znovu volat endpoint pro čtení dat.</p>


<h2 id="optimisticke-updaty">Optimistické updaty</h2>

<p>Pokročilejší technika jsou <b>optimistické updaty</b>. O co jde? Aplikace spoléhá na to, že se akci povede dokončit. Jsou-li dobře vyřešené validace na straně klienta, není moc reálně důvod, že by volání API mělo skončit chybou.</p>




<p>Takže se ihned po vyvolání akce uživatelem nastaví do query klíčů očekávaná data. Zároveň se zavolá API pro danou akci. A mohou nastat dva případy:</p>

<ol>
  <li>
    <p>Akce skončí <b>úspěšně</b> – nic se nemusí dělat.</p>
  </li>
  
  <li>
    <p>Akce skončí <b>chybou</b> – data se vrátí do předchozího stavu a zobrazí se chyba.</p>
  </li>
</ol>

<p>Používají se k tomu mutace, na které lze navěsit obslužnou logiku. Kód <a href="https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates">optimistických updatů</a> už je trochu komplikovanější:</p>

<pre><code>useMutation({
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
})</code></pre>





















<p>Je potřeba si rozmyslet, jestli to za to stojí.</p>

<ol>
  <li>
    <p>U <b>závazných akcí</b> to nemusí být úplně dobré řešení. Třeba u tlačítka pro dokončení objednávky.</p>
  </li>
  <li>
    <p>Pokud API <b>odpovídá velmi rychle</b>, třeba desítky milisekund, přínos nebude moc velký.</p>
  </li>
</ol>


<h2 id="kombinovane">Kombinované query</h2>

<p>Přes <code>combine</code> jde spojit data z více <i>queries</i> do jedné.</p>

<pre><code>const ids = [1, 2, 3]
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
})</code></pre>















<p>To se hodí hlavně v případě, že kdy je problematické přizpůsobit API požadavkům na frontendu.</p>

<p>Jde si tak celkem šikovně poskládat data z více API volání do jedné datové struktury.</p>



<p>Typický případ je napojování číselníků na ID. Jde si souběžně stáhnout všechna data, v <code>combine</code> je spojit dohromady a dál s nimi už pracovat jako s jedním celkem.</p>


<h2 id="integrace">Integrace do JS frameworků</h2>

<p>Kromě používání v čistém JS existují přímo napojení pro React, Solid, Vue, Svelte a Angular.</p>

<p>Není tedy problém TanStack Query zapojit do libovolného projektu. A není potřeba kvůli tomu přepisovat celou aplikaci. Jde s tím začít i postupně.</p>






<p>TanStack Query je poměrně rozšířený a existuje pro něj mnoho nástrojů. Dost zajímavé jsou různé generátory, které dokáží z API specifikace rovnou vytvořit hotové funkce pro volání API, které automaticky TanStack Query používají <i>na pozadí</i>.</p>

<div class="external-content">
  <ul>
    <li>
      TanStack Query:
      <a href="https://tanstack.com/query/latest/docs/framework/react/community/community-projects">Community Projects</a>
    </li>
  </ul>
</div>


