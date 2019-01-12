# Verkefni 1

Verkefni 1 snýst um að útfæra bakenda sem birtir gögn fyrir „prótótýpuvef af fyrirlestravef“ sem byggð var sem [seinna hópverkefni í vefforritun 1, 2018](https://github.com/vefforritun/vef1-2018-h2-synilausn). Í því verkefni voru gögn búin til og birt _aðeins_ á framenda. Í þessu verkefni skal birta þau frá _bakenda_.

Útfæra skal Express vefþjón sem birtir yfirlit yfir fyrirlestra úr möppu á disk og möguleika á að skoða hvern fyrirlestur.

[Kynning á verkefni](https://youtu.be/ADmCKJJOzuk).

## Fyrirlestrar

Fylgja skal [útliti sem gefið er í hópverkefni 2](https://github.com/vefforritun/vef1-2018-h2-synilausn/tree/master/utlit), leyfilegt er að afrita CSS sem búið er til útfrá Sass í sýnilausn af verkefni. Keyra þarf upp verkefnið til að nálgast `dist/styles.css` sem verður til þegar `npm run sass` er keyrt. Til að útlit virki þarf að fylgja því HTML sem búið er til fyrir framenda í [`src/lib/list.js`](https://github.com/vefforritun/vef1-2018-h2-synilausn/blob/master/src/lib/list.js) og [`src/lib`](https://github.com/vefforritun/vef1-2018-h2-synilausn/blob/master/src/lib/lecture.js). Gott getur verið að keyra upp verkefni og skoða með DevTools.

Birta þarf upplýsingar úr `lectures.json` bæði á yfirlitssíðu og fyrir hvern og einn fyrirlestur. Lesa má nánar um [uppsetningu á json skrá í lýsingu á hópverkefni 2](https://github.com/vefforritun/vef1-2018-h2-synilausn#fyrirlestrag%C3%B6gn).

Titill skal vera „Fyrirlestrar“ fyrir forsíðu en titill fyrirlesturs fyrir hvern stakan fyrirlestur. Hver fyrirlestur skal svara á `/:slug`, þ.e.a.s., setja skal upp dýnamísk route með express.

Fyrir hvern fyrirlestur þarf að birta efni úr `content` fylki fyrirlesturs. Hægt er skrifa virkni frá grunni eða nýta þá [virkni sem gefin er í sýnilausn af hópverkefni 2](https://github.com/vefforritun/vef1-2018-h2-synilausn/blob/master/src/lib/item.js). Ef sú virkni er notuð er mælt með að sækja [`jsdom`](https://github.com/jsdom/jsdom) sem leyfir okkur að nota HTML staðla _á bakenda_, þ.e.a.s., fá aðgang að `window` og `document` og geta þannig búið til HTML ótengt vafra. Til að fá HTML niðurstöðu eftir að búið er að tengja `jsdom`, þarf að kalla í `outerHTML()` fall á nóðu sem skila á. Gott er að útbúa fall sem tekur inn fylki af efni (`content`) og skilar streng sem er HTML, sjá `app.js`. Hægt er að endurnýta kóða að öllu leiti, aðeins þarf að breyta því hvernig módúll er notaður (eða nota `--experimental-modules`) og hvernig kóði fær `document` (þá frá `jsdom`, ekki global breyta frá vafra).

[Sýnidæmi um notkun á `jsdom` með node](examples/).

## Útfærsla

Fyrirlesa skal lesa _asynchronously_ af disk með callbacks, promises eða `async await`.

Ekki þarf að útfæra „filtera“ á forsíðu eða það að geta klárað fyrirlestur.

Notast skal við [EJS template](https://github.com/mde/ejs) til að útbúa HTML. Útbúa skal `header.ejs` og `footer.ejs` sem önnur template nota. `views/` ætti að innihalda template.

Setja skal upp villumeðhöndlun fyrir almennar villur og ef beðið er um slóð sem ekki er til (404). Skilaboð skulu birt notanda um hvað gerðist („Síða fannst ekki“ – „Villa kom upp“).

`app.js` skal setja upp Express vefþjón en virkni sem les greinar og útbýr routes fyrir þær skal útfærð í `lectures.js`.

`public/` inniheldur þau gögn sem ættu að vera aðgengileg með _static middleware_ í express. CSS ætti að vera geymt í þessari möppu. `public/img/` inniheldur myndir sem `lectures.json` notar.

Öll dependency skulu skráð í `package.json`. `eslint` pakkar eru nú þegar uppsettir sem `devDependency`.

`npm start` skal keyra upp vefþjón á `localhost` porti `3000`.

Gott getur verið að setja upp `dev` script sem keyrir `nodemon`.

## Git og GitHub

Verkefni þetta er sett fyrir á GitHub og almennt ætti að skila því úr einka (private) repo nemanda. Nemendur geta fengið gjaldfrjálsan aðgang að einkarepos á meðan námi stendur, sjá https://education.github.com/.

Til að byrja er hægt að afrita þetta repo og bæta við á sínu eigin:

```bash
> git clone https://github.com/vefforritun/vef2-2019-v1.git
> cd vef2-2019-v1
> git remote remove origin # fjarlægja remote sem verkefni er í
> git remote add origin <slóð á repo> # bæta við í þínu repo
> git push
```

## Mat

* 10% – Snyrtilegur kóði, engar villur þegar `npm test` er keyrt
* 40% – Fyrirlestralisti
* 40% – Fyrirlestur með efni
* 10% – Villumeðhöndlun

## Sett fyrir

Verkefni sett fyrir í fyrirlestri fimmtudaginn 10. janúar 2019.

## Skil

Skila skal undir „Verkefni og hlutaprófa“ á Uglu í seinasta lagi fyrir lok dags föstudaginn 25. janúar 2019.

Skilaboð skulu innihalda:

* Slóð á GitHub repo fyrir verkefni, og dæmatímakennurum skal hafa verið boðið í repo (sjá leiðbeiningar). Notendanöfn þeirra eru `freyrdanielsson`, `gunkol`, `kth130`, `osk`

## Einkunn

Sett verða fyrir sex minni verkefni þar sem fimm bestu gilda 6% hvert, samtals 30% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 15%, samtals 30% af lokaeinkunn.

Verkefnahluti gildir 60% og lokapróf gildir 40%. Ná verður *bæði* verkefnahluta og lokaprófi með lágmarkseinkunn 5.

---

> Útgáfa 0.1
