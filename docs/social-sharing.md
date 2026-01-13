# Automatické sdílení článků na sociální sítě

Tento dokument popisuje nastavení automatického sdílení nových článků na X (Twitter), Facebook a LinkedIn.

## Jak to funguje

1. Když pushnete nový článek do `content/posts/` na `main` branch, Vercel automaticky spustí deployment
2. Po úspěšném dokončení Vercel deploymentu se spustí GitHub Actions workflow (pomocí `deployment_status` eventu)
3. Workflow extrahuje metadata článku (titulek, popis, tagy, URL)
4. Článek je automaticky sdílen na X, Facebook a LinkedIn (pokud jsou nastaveny API klíče)

Toto řešení využívá nativní integraci Vercelu s GitHubem - není potřeba žádné extra nastavení ani API tokeny pro čekání na deployment.

## Nastavení X (Twitter)

### 1. Vytvoření Developer účtu

1. Jděte na [X Developer Portal](https://developer.x.com/en/portal/dashboard)
2. Přihlaste se účtem, ze kterého chcete publikovat
3. Vytvořte nový projekt a aplikaci

### 2. Nastavení oprávnění

V nastavení aplikace:

1. Jděte do **User authentication settings**
2. Nastavte **App permissions** na **Read and write**
3. Nastavte **Type of App** na **Web App, Automated App or Bot**
4. Callback URL může být libovolná (např. `https://example.com`)

### 3. Získání API klíčů

1. V sekci **Keys and tokens** vygenerujte:
   - **API Key and Secret** (Consumer Keys)
   - **Access Token and Secret** (s Read and Write oprávněním)

### 4. Nastavení GitHub Secrets

V repozitáři jděte do **Settings > Secrets and variables > Actions** a přidejte:

| Secret                  | Popis                            |
| ----------------------- | -------------------------------- |
| `X_API_KEY`             | API Key (Consumer Key)           |
| `X_API_SECRET`          | API Key Secret (Consumer Secret) |
| `X_ACCESS_TOKEN`        | Access Token                     |
| `X_ACCESS_TOKEN_SECRET` | Access Token Secret              |

---

## Nastavení Facebook

### 1. Vytvoření Facebook App

1. Jděte na [Facebook Developers](https://developers.facebook.com/)
2. Vytvořte novou aplikaci typu **Business**
3. Přidejte produkt **Facebook Login for Business**

### 2. Získání Page Access Token

Pro získání dlouhodobého Page Access Tokenu:

#### Krok 1: Získejte User Access Token

1. Jděte do [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Vyberte vaši aplikaci
3. Klikněte na **Generate Access Token**
4. Požádejte o oprávnění:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
5. Povolte přístup ke stránce, na kterou chcete publikovat

#### Krok 2: Získejte Page Access Token

V Graph API Explorer spusťte:

```
GET /me/accounts
```

Odpověď bude obsahovat seznam stránek s jejich `access_token` a `id`.

#### Krok 3: Vytvořte Long-Lived Page Token

1. Nejprve převeďte User token na Long-Lived token:

```
GET /oauth/access_token?
  grant_type=fb_exchange_token&
  client_id={app-id}&
  client_secret={app-secret}&
  fb_exchange_token={short-lived-user-token}
```

2. Pak získejte Long-Lived Page token:

```
GET /{page-id}?fields=access_token&access_token={long-lived-user-token}
```

Tento Page Access Token vydrží navždy (dokud nezrušíte oprávnění).

### 3. Nastavení GitHub Secrets

V repozitáři jděte do **Settings > Secrets and variables > Actions** a přidejte:

| Secret                  | Popis                        |
| ----------------------- | ---------------------------- |
| `FACEBOOK_PAGE_ID`      | ID vaší Facebook stránky     |
| `FACEBOOK_ACCESS_TOKEN` | Long-Lived Page Access Token |

---

## Nastavení LinkedIn

### 1. Vytvoření LinkedIn App

1. Jděte na [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Klikněte na **Create app**
3. Vyplňte název aplikace a přiřaďte ji k LinkedIn stránce (nebo osobnímu profilu)

### 2. Nastavení oprávnění

V nastavení aplikace:

1. Jděte do **Products** a požádejte o **Share on LinkedIn** (pro osobní profil) nebo **Marketing Developer Platform** (pro firemní stránku)
2. V **Auth** zkontrolujte, že máte scope `w_member_social`

### 3. Získání Access Token

#### Pro osobní profil:

1. V **Auth** najdete **OAuth 2.0 settings**
2. Použijte OAuth 2.0 flow pro získání access tokenu s scope `w_member_social`
3. Pro získání Person ID zavolejte:

```
GET https://api.linkedin.com/v2/me
Authorization: Bearer {access_token}
```

Odpověď obsahuje `id` - váš Person URN je `urn:li:person:{id}`

#### Pro firemní stránku:

1. Požádejte o **Marketing Developer Platform** access
2. Získejte access token s scope `w_organization_social`
3. Organization ID najdete v URL vaší LinkedIn stránky

### 4. Nastavení GitHub Secrets

| Secret                     | Popis                                             |
| -------------------------- | ------------------------------------------------- |
| `LINKEDIN_ACCESS_TOKEN`    | OAuth 2.0 Access Token                            |
| `LINKEDIN_PERSON_ID`       | Pro osobní profil: `urn:li:person:ABC123`         |
| `LINKEDIN_ORGANIZATION_ID` | Pro firemní stránku: `urn:li:organization:123456` |

**Poznámka:** Stačí nastavit buď `LINKEDIN_PERSON_ID` nebo `LINKEDIN_ORGANIZATION_ID`.

---

## Manuální testování

Můžete otestovat skripty lokálně:

### Test detekce nových článků

```bash
node scripts/social/get-new-articles.js --json
```

### Test postování na X

```bash
export X_API_KEY="..."
export X_API_SECRET="..."
export X_ACCESS_TOKEN="..."
export X_ACCESS_TOKEN_SECRET="..."

node scripts/social/post-to-x.js --article='{"title":"Test článek","url":"https://jecas.cz/test","tags":["javascript"]}'
```

### Test postování na Facebook

```bash
export FACEBOOK_PAGE_ID="..."
export FACEBOOK_ACCESS_TOKEN="..."

node scripts/social/post-to-facebook.js --article='{"title":"Test článek","url":"https://jecas.cz/test","description":"Popis článku","tags":["javascript"]}'
```

### Test postování na LinkedIn

```bash
export LINKEDIN_ACCESS_TOKEN="..."
export LINKEDIN_PERSON_ID="urn:li:person:..."  # nebo LINKEDIN_ORGANIZATION_ID

node scripts/social/post-to-linkedin.js --article='{"title":"Test článek","url":"https://jecas.cz/test","description":"Popis článku","tags":["javascript"]}'
```

---

## Troubleshooting

### X (Twitter)

**Chyba 401 Unauthorized**

- Zkontrolujte, že máte správně nastavená oprávnění aplikace (Read and Write)
- Ujistěte se, že Access Token byl vygenerován s Read and Write oprávněním

**Chyba 403 Forbidden**

- Vaše aplikace možná nemá přístup k v2 API - zkontrolujte Developer Portal

### Facebook

**Chyba (#200) Permissions error**

- Ujistěte se, že Page Access Token má oprávnění `pages_manage_posts`
- Zkontrolujte, že token je pro správnou stránku

**Token expiroval**

- Vygenerujte nový Long-Lived Page Access Token (viz instrukce výše)

### LinkedIn

**Chyba 401 Unauthorized**

- Access token expiroval - LinkedIn tokeny vydrží 60 dní
- Vygenerujte nový access token

**Chyba 403 Forbidden**

- Zkontrolujte, že máte správný scope (`w_member_social` nebo `w_organization_social`)
- Ověřte, že Person/Organization ID je ve správném formátu (`urn:li:person:...`)

---

## Bezpečnost

- Nikdy necommitujte API klíče do repozitáře
- Používejte pouze GitHub Secrets pro ukládání citlivých dat
- Pravidelně rotujte access tokeny
- Omezte oprávnění aplikací na minimum potřebné pro fungování
