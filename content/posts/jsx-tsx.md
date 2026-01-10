---
title: "JSX a TSX"
headline: "JSX a TSX"
description: "Syntaktické rozšíření JavaScriptu a TypeScriptu pro psaní HTML-like kódu přímo v JS souborech."
date: "2026-01-10"
last_modification: "2026-01-10"
status: 1
tags: ["js"]
format: "html"
---

<p>JSX (JavaScript XML) je <b>syntaktické rozšíření</b> JavaScriptu, které umožňuje psát HTML-like kód přímo v JavaScript souborech. TSX je totéž pro TypeScript. Popularitu získalo díky knihovně <b>React</b>, ale dnes ho používají i další frameworky.</p>

<h2 id="co-je-jsx">Co je JSX</h2>

<p>JSX vypadá jako HTML, ale ve skutečnosti se kompiluje do volání JavaScriptových funkcí:</p>

<pre><code>// JSX zápis
const element = &lt;h1 className="title"&gt;Ahoj světe&lt;/h1&gt;;

// Kompiluje se do
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Ahoj světe'
);</code></pre>

<p>Prohlížeč JSX nerozumí — potřebujete nástroj jako <b>Babel</b>, <b>TypeScript</b> nebo <b>esbuild</b>, který JSX převede do běžného JavaScriptu.</p>

<h2 id="rozdil-jsx-tsx">Rozdíl mezi JSX a TSX</h2>

<p>Jediný rozdíl je v příponu souboru a typové kontrole:</p>

<ul>
  <li><code>.jsx</code> — JavaScript s JSX syntaxí</li>
  <li><code>.tsx</code> — TypeScript s JSX syntaxí</li>
</ul>

<p>V TSX máte navíc typovou kontrolu props:</p>

<pre><code>// TSX s typováním
interface ButtonProps {
  label: string;
  onClick: () =&gt; void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    &lt;button onClick={onClick} disabled={disabled}&gt;
      {label}
    &lt;/button&gt;
  );
}</code></pre>

<h2 id="zakladni-syntaxe">Základní syntaxe</h2>

<h3>Elementy</h3>

<p>JSX elementy vypadají jako HTML, ale s drobnými rozdíly:</p>

<pre><code>// Jeden element
const heading = &lt;h1&gt;Nadpis&lt;/h1&gt;;

// Vnořené elementy
const card = (
  &lt;div className="card"&gt;
    &lt;h2&gt;Titulek&lt;/h2&gt;
    &lt;p&gt;Obsah karty&lt;/p&gt;
  &lt;/div&gt;
);

// Self-closing tagy
const image = &lt;img src="/foto.jpg" alt="Popis" /&gt;;
const input = &lt;input type="text" /&gt;;</code></pre>

<h3>Fragmenty</h3>

<p>JSX vyžaduje jeden kořenový element. Pro více elementů bez wrapperu použijte <b>fragment</b>:</p>

<pre><code>// Fragment pomocí &lt;&gt;...&lt;/&gt;
function List() {
  return (
    &lt;&gt;
      &lt;li&gt;První&lt;/li&gt;
      &lt;li&gt;Druhý&lt;/li&gt;
      &lt;li&gt;Třetí&lt;/li&gt;
    &lt;/&gt;
  );
}

// Nebo React.Fragment s key
function Items({ items }) {
  return items.map(item =&gt; (
    &lt;React.Fragment key={item.id}&gt;
      &lt;dt&gt;{item.term}&lt;/dt&gt;
      &lt;dd&gt;{item.definition}&lt;/dd&gt;
    &lt;/React.Fragment&gt;
  ));
}</code></pre>

<h2 id="vyrazy">Výrazy v JSX</h2>

<p>Složené závorky <code>{}</code> umožňují vkládat JavaScript výrazy:</p>

<pre><code>const name = 'Jan';
const count = 5;

// Proměnné
const greeting = &lt;p&gt;Ahoj, {name}!&lt;/p&gt;;

// Výrazy
const doubled = &lt;span&gt;{count * 2}&lt;/span&gt;;

// Volání funkcí
const upper = &lt;p&gt;{name.toUpperCase()}&lt;/p&gt;;

// Template literály
const message = &lt;p&gt;{`Máte ${count} zpráv`}&lt;/p&gt;;</code></pre>

<h3>Podmíněné vykreslování</h3>

<pre><code>// Ternární operátor
function Status({ isOnline }) {
  return (
    &lt;span&gt;
      {isOnline ? 'Online' : 'Offline'}
    &lt;/span&gt;
  );
}

// Logické AND pro podmíněné zobrazení
function Notification({ count }) {
  return (
    &lt;div&gt;
      {count &gt; 0 &amp;&amp; &lt;span className="badge"&gt;{count}&lt;/span&gt;}
    &lt;/div&gt;
  );
}

// Podmínka mimo JSX
function Message({ type }) {
  let icon;
  if (type === 'error') {
    icon = &lt;ErrorIcon /&gt;;
  } else if (type === 'warning') {
    icon = &lt;WarningIcon /&gt;;
  } else {
    icon = &lt;InfoIcon /&gt;;
  }

  return &lt;div&gt;{icon}&lt;/div&gt;;
}</code></pre>

<h3>Iterace</h3>

<pre><code>const items = ['Jablko', 'Hruška', 'Banán'];

function FruitList() {
  return (
    &lt;ul&gt;
      {items.map((item, index) =&gt; (
        &lt;li key={index}&gt;{item}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}

// S objekty
const users = [
  { id: 1, name: 'Jan' },
  { id: 2, name: 'Eva' }
];

function UserList() {
  return (
    &lt;ul&gt;
      {users.map(user =&gt; (
        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</code></pre>

<p>Atribut <code>key</code> je povinný při vykreslování seznamů. Pomáhá Reactu identifikovat, které položky se změnily.</p>

<h2 id="atributy">Atributy a props</h2>

<h3>HTML atributy</h3>

<p>Některé HTML atributy mají v JSX jiný název kvůli rezervovaným slovům v JavaScriptu:</p>

<table>
  <tr>
    <th>HTML</th>
    <th>JSX</th>
  </tr>
  <tr>
    <td><code>class</code></td>
    <td><code>className</code></td>
  </tr>
  <tr>
    <td><code>for</code></td>
    <td><code>htmlFor</code></td>
  </tr>
  <tr>
    <td><code>tabindex</code></td>
    <td><code>tabIndex</code></td>
  </tr>
  <tr>
    <td><code>readonly</code></td>
    <td><code>readOnly</code></td>
  </tr>
  <tr>
    <td><code>colspan</code></td>
    <td><code>colSpan</code></td>
  </tr>
</table>

<pre><code>&lt;label htmlFor="email" className="form-label"&gt;
  E-mail
&lt;/label&gt;
&lt;input
  id="email"
  type="email"
  className="form-input"
  readOnly={false}
  tabIndex={0}
/&gt;</code></pre>

<h3>Spread atributy</h3>

<p>Pomocí spread operátoru můžete předat objekt jako props:</p>

<pre><code>const buttonProps = {
  type: 'submit',
  className: 'btn btn-primary',
  disabled: false
};

// Všechny props najednou
&lt;button {...buttonProps}&gt;Odeslat&lt;/button&gt;

// Kombinace se specifickými props
&lt;button {...buttonProps} onClick={handleClick}&gt;
  Odeslat
&lt;/button&gt;</code></pre>

<h2 id="styly">Inline styly</h2>

<p>Atribut <code>style</code> přijímá objekt, ne řetězec:</p>

<pre><code>// Správně - objekt
&lt;div style={{ color: 'red', fontSize: '16px' }}&gt;
  Text
&lt;/div&gt;

// CSS vlastnosti jsou camelCase
const styles = {
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  padding: '1rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

&lt;div style={styles}&gt;Karta&lt;/div&gt;

// Číselné hodnoty (px se přidá automaticky pro některé vlastnosti)
&lt;div style={{ width: 200, height: 100 }}&gt;Box&lt;/div&gt;</code></pre>

<h2 id="udalosti">Události</h2>

<p>Události v JSX jsou camelCase a přijímají funkci jako handler:</p>

<pre><code>function Button() {
  const handleClick = (event) =&gt; {
    console.log('Kliknuto!', event);
  };

  return (
    &lt;button onClick={handleClick}&gt;
      Klikni
    &lt;/button&gt;
  );
}

// Inline handler
&lt;button onClick={() =&gt; console.log('Klik')}&gt;
  Tlačítko
&lt;/button&gt;

// S parametrem
&lt;button onClick={() =&gt; handleDelete(item.id)}&gt;
  Smazat
&lt;/button&gt;

// Různé události
&lt;input
  onChange={(e) =&gt; setValue(e.target.value)}
  onFocus={() =&gt; setFocused(true)}
  onBlur={() =&gt; setFocused(false)}
  onKeyDown={(e) =&gt; e.key === 'Enter' &amp;&amp; submit()}
/&gt;

&lt;form onSubmit={(e) =&gt; {
  e.preventDefault();
  handleSubmit();
}}&gt;
  ...
&lt;/form&gt;</code></pre>

<h2 id="komponenty">Komponenty</h2>

<p>Komponenty jsou funkce vracející JSX. Názvy začínají velkým písmenem:</p>

<pre><code>// Jednoduchá komponenta
function Welcome() {
  return &lt;h1&gt;Vítejte!&lt;/h1&gt;;
}

// Komponenta s props
function Greeting({ name, age }) {
  return (
    &lt;div&gt;
      &lt;h2&gt;Ahoj, {name}!&lt;/h2&gt;
      &lt;p&gt;Je ti {age} let.&lt;/p&gt;
    &lt;/div&gt;
  );
}

// Použití
function App() {
  return (
    &lt;div&gt;
      &lt;Welcome /&gt;
      &lt;Greeting name="Jan" age={25} /&gt;
    &lt;/div&gt;
  );
}</code></pre>

<h3>Children</h3>

<p>Obsah mezi otevíracím a zavíracím tagem je dostupný jako <code>children</code>:</p>

<pre><code>function Card({ title, children }) {
  return (
    &lt;div className="card"&gt;
      &lt;h3&gt;{title}&lt;/h3&gt;
      &lt;div className="card-body"&gt;
        {children}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

// Použití
&lt;Card title="Můj článek"&gt;
  &lt;p&gt;Obsah karty...&lt;/p&gt;
  &lt;button&gt;Akce&lt;/button&gt;
&lt;/Card&gt;</code></pre>

<h2 id="tsx-typovani">TSX a typování</h2>

<p>V TypeScriptu definujete typy pro props:</p>

<pre><code>// Rozhraní pro props
interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;  // volitelný
  onEdit: (id: number) =&gt; void;
}

function UserCard({ name, email, avatar, onEdit }: UserCardProps) {
  return (
    &lt;div className="user-card"&gt;
      {avatar &amp;&amp; &lt;img src={avatar} alt={name} /&gt;}
      &lt;h3&gt;{name}&lt;/h3&gt;
      &lt;p&gt;{email}&lt;/p&gt;
      &lt;button onClick={() =&gt; onEdit(1)}&gt;Upravit&lt;/button&gt;
    &lt;/div&gt;
  );
}

// S generiky
interface ListProps&lt;T&gt; {
  items: T[];
  renderItem: (item: T) =&gt; React.ReactNode;
}

function List&lt;T&gt;({ items, renderItem }: ListProps&lt;T&gt;) {
  return &lt;ul&gt;{items.map(renderItem)}&lt;/ul&gt;;
}</code></pre>

<h3>Vestavěné typy</h3>

<pre><code>import { ReactNode, MouseEvent, ChangeEvent } from 'react';

interface Props {
  // Cokoliv vykreslitelného
  children: ReactNode;

  // Event handlery
  onClick: (e: MouseEvent&lt;HTMLButtonElement&gt;) =&gt; void;
  onChange: (e: ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void;
}

// Komponenta rozšiřující HTML atributy
interface ButtonProps extends React.ButtonHTMLAttributes&lt;HTMLButtonElement&gt; {
  variant: 'primary' | 'secondary';
}

function Button({ variant, children, ...rest }: ButtonProps) {
  return (
    &lt;button className={`btn btn-${variant}`} {...rest}&gt;
      {children}
    &lt;/button&gt;
  );
}</code></pre>

<h2 id="jsx-transform">Jak JSX funguje</h2>

<p>JSX se transformuje do volání funkcí. Starší způsob používal <code>React.createElement</code>:</p>

<pre><code>// JSX
&lt;div className="container"&gt;
  &lt;h1&gt;Nadpis&lt;/h1&gt;
  &lt;p&gt;Text&lt;/p&gt;
&lt;/div&gt;

// Starý transform (před React 17)
React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Nadpis'),
  React.createElement('p', null, 'Text')
);</code></pre>

<p>Od React 17 existuje nový JSX transform, který nevyžaduje import Reactu:</p>

<pre><code>// Nový transform (React 17+)
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

_jsxs('div', {
  className: 'container',
  children: [
    _jsx('h1', { children: 'Nadpis' }),
    _jsx('p', { children: 'Text' })
  ]
});</code></pre>

<h2 id="nastaveni">Nastavení projektu</h2>

<h3>Vite (doporučeno)</h3>

<pre><code># Nový projekt s React + TypeScript
npm create vite@latest my-app -- --template react-ts

cd my-app
npm install
npm run dev</code></pre>

<h3>TypeScript konfigurace</h3>

<p>Pro TSX soubory nastavte v <code>tsconfig.json</code>:</p>

<pre><code>{
  "compilerOptions": {
    "jsx": "react-jsx",  // Pro React 17+
    "strict": true,
    "esModuleInterop": true
  }
}</code></pre>

<p>Možnosti pro <code>jsx</code>:</p>

<ul>
  <li><code>react</code> — starý transform, vyžaduje <code>import React</code></li>
  <li><code>react-jsx</code> — nový transform (React 17+)</li>
  <li><code>react-jsxdev</code> — nový transform s debug info</li>
  <li><code>preserve</code> — ponechá JSX pro další nástroj</li>
</ul>

<h2 id="pravidla">Pravidla JSX</h2>

<ul>
  <li><b>Jeden kořenový element</b> — nebo fragment</li>
  <li><b>Všechny tagy musí být zavřené</b> — <code>&lt;br /&gt;</code>, ne <code>&lt;br&gt;</code></li>
  <li><b>camelCase pro atributy</b> — <code>className</code>, <code>onClick</code></li>
  <li><b>Komponenty velkým písmenem</b> — <code>&lt;MyComponent /&gt;</code></li>
  <li><b>Výrazy ve složených závorkách</b> — <code>{expression}</code></li>
  <li><b>Komentáře ve složených závorkách</b> — <code>{/* komentář */}</code></li>
</ul>

<h2 id="bez-reactu">JSX bez Reactu</h2>

<p>JSX můžete použít i s jinými knihovnami:</p>

<h3>Preact</h3>

<pre><code>// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "preact"
  }
}</code></pre>

<h3>SolidJS</h3>

<pre><code>// vite.config.js
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()]
});</code></pre>

<h3>Vue (experimentálně)</h3>

<p>Vue podporuje JSX pomocí <code>@vitejs/plugin-vue-jsx</code>.</p>

<h2 id="tipy">Tipy</h2>

<ul>
  <li><b>Extrahujte opakující se JSX</b> do samostatných komponent</li>
  <li><b>Používejte TypeScript</b> pro lepší typovou kontrolu props</li>
  <li><b>Vyhněte se inline funkcím</b> v props pro lepší výkon</li>
  <li><b>Destructurujte props</b> pro přehlednější kód</li>
  <li><b>Používejte fragmenty</b> místo zbytečných wrapper divů</li>
</ul>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://react.dev/learn/writing-markup-with-jsx">React: Writing Markup with JSX</a></li>
  <li><a href="https://www.typescriptlang.org/docs/handbook/jsx.html">TypeScript: JSX</a></li>
</ul>
