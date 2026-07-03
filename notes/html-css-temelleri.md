# HTML & CSS Temelleri (Bölüm 2 — Kurslarım Projesi Öncesi Hazırlık)

Bölüm 2'ye geçmeden önce HTML/CSS'i tazelemek mantıklı, çünkü "Kurslarım Projesi" muhtemelen kart listesi, layout, biraz stil gerektirecek ve JSX aslında HTML'in üzerine kurulu (birkaç farkla: `class` yerine `className`, `for` yerine `htmlFor` gibi — bunlar LoginForm'da da görülmüştü).

---

## HTML — Sayfanın İskeleti

HTML'i .NET tarafında düşünürsen, bir Razor view'ın (`.cshtml`) markup kısmı gibi düşünebilirsin — sayfanın **yapısını** tanımlar, mantığını değil.

**Doküman iskeleti** hep şöyle başlar:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sayfa Başlığı</title>
  </head>
  <body>
    <!-- içerik burada -->
  </body>
</html>
```

React projesinde bunu genelde görmezsin çünkü `index.html` bir kere var ve React senin component'lerini `<div id="root">` içine basıyor. Ama bilmen gerekiyor çünkü JSX'in kuralları aslında HTML'den geliyor.

### Semantic Taglar — `div` her şey değil

Yeni başlayanların en sık yaptığı hata: her şeyi `<div>` ile sarmak. Modern HTML'de anlamlı taglar var:

| Tag | Ne için |
|---|---|
| `<header>` | Sayfa/bölüm başlığı alanı |
| `<nav>` | Navigasyon menüsü |
| `<main>` | Sayfanın asıl içeriği (sayfada bir tane olmalı) |
| `<section>` | Anlamlı bir bölüm |
| `<article>` | Kendi başına anlamlı bir blok (bir kurs kartı, bir blog yazısı gibi) |
| `<footer>` | Alt bilgi alanı |
| `<div>` | Anlamsız, sadece **layout/gruplama** için |
| `<span>` | `div`'in inline hali — bir cümle içinde bir kelimeyi sarmak için |

**Neden önemli?** Erişilebilirlik (screen reader'lar) ve SEO için. Ama pratik açıdan: "Kurslarım Projesi"nde her kurs kartı için `<article>`, kart listesini saran şey için `<section>` kullanmak, "bu bir kart listesi" mesajını hem tarayıcıya hem sana (kodu okurken) verir.

### Form Elemanları — LoginForm'dan hatırlarsın

```html
<form>
  <label htmlFor="email">E-posta</label>
  <input type="email" id="email" name="email" />

  <label htmlFor="password">Şifre</label>
  <input type="password" id="password" name="password" />

  <button type="submit">Giriş Yap</button>
</form>
```

- `label` + `htmlFor` + `input`'un `id`'si eşleşmeli — bu eşleşme, label'a tıklayınca input'un fokuslanmasını sağlar (mobilde çok işine yarar).
- `input type=`: `text`, `email`, `password`, `number`, `checkbox`, `radio`, `date` — tarayıcı her birine göre farklı davranıyor (örn. `email` mobilde @ tuşunu klavyede öne çıkarır).
- `button type="submit"` formu submit eder → `onSubmit` event'i tetiklenir (`e.preventDefault()` kullandığın yer burası).

### Attribute Kavramı

`id`, `class`, `src`, `href`, `alt` gibi şeyler HTML elementinin **attribute**'ları — C#'taki bir nesnenin property'leri gibi düşünebilirsin. React'ta ikisi isim değiştiriyor çünkü `class` ve `for` JavaScript'te zaten rezerve kelime:
- `class` → `className`
- `for` → `htmlFor`

Geri kalan hepsi (`src`, `href`, `id`, `type`, `placeholder`...) aynı kalıyor.

---

## CSS — Stil Verme

CSS'i şöyle düşün: HTML elementlerine "bu neye benzesin" diyen kural seti. Selector + kural bloğu:

```css
.kart {
  background-color: white;
  padding: 16px;
}
```

### Selector Çeşitleri

```css
p { }              /* tüm <p> etiketleri */
.kart { }           /* class="kart" olan her şey */
#header { }          /* id="header" olan tek element */
.kart .baslik { }     /* .kart içindeki .baslik'ler (iç içe) */
.kart:hover { }       /* fare üzerine gelince */
input:focus { }       /* input'a tıklanınca/fokuslanınca */
li:nth-child(2) { }   /* listenin 2. elemanı */
```

Class selector (`.kart`) en çok kullanacağın tür olacak, çünkü React'ta `className="kart"` yazıp CSS dosyasında `.kart {}` ile stilini vereceksin.

### Box Model — En kritik kavram

Her HTML elementi aslında görünmez bir kutu. Bu kutu 4 katmandan oluşuyor, içten dışa:

```
┌───────────────────────────────┐
│         margin (dış boşluk)   │
│  ┌─────────────────────────┐  │
│  │     border (çerçeve)    │  │
│  │  ┌───────────────────┐  │  │
│  │  │ padding(iç boşluk)│  │  │
│  │  │    ┌───────────┐  │  │  │
│  │  │    │  content  │  │  │  │
│  │  │    └───────────┘  │  │  │
│  │  └───────────────────┘  │  │
│  └─────────────────────────┘  │
└───────────────────────────────┘
```

```css
.kart {
  padding: 16px;        /* içerik ile çerçeve arası boşluk */
  border: 1px solid #ddd;
  margin: 8px;           /* diğer elemanlarla arasındaki boşluk */
  box-sizing: border-box; /* neredeyse her projede eklenir, aşağıda anlatılıyor */
}
```

`box-sizing: border-box` önemli bir detay: varsayılan davranışta `width: 200px` dediğinde, padding ve border bu 200px'e **eklenir** (kutu büyür). `border-box` dersen, padding ve border 200px'in **içine** sığar — yani genişlik hesaplaman şaşırtıcı olmaz. Bu yüzden çoğu proje en başta şunu yazar:

```css
* {
  box-sizing: border-box;
}
```

### Display: Elementler nasıl dizilir

- `block`: tüm satırı kaplar, alt alta dizilir (`div`, `p`, `h1` varsayılan olarak böyle)
- `inline`: sadece içeriği kadar yer kaplar, yan yana dizilir (`span`, `a` varsayılan)
- `inline-block`: yan yana dizilir ama width/height verebilirsin
- `none`: elementi tamamen yok eder (React'taki `condition && <div>` mantığına benzer ama CSS ile)

### Flexbox — Kart listesi için en çok kullanacağın şey

Kurslarım projesinde muhtemelen kart listesi olacak, ve bunu flexbox ile dizeceksin:

```css
.kart-listesi {
  display: flex;
  flex-direction: row;    /* row: yan yana, column: alt alta */
  gap: 16px;               /* kartlar arası boşluk, margin yazmana gerek kalmaz */
  flex-wrap: wrap;         /* sığmayınca alt satıra geçsin */
  justify-content: center; /* yatay hizalama */
  align-items: center;     /* dikey hizalama */
}
```

Mantığını şöyle kur: `.kart-listesi`'ne `display: flex` verdiğin an, içindeki **direkt child'lar** otomatik olarak yan yana dizilir. `justify-content` ana eksendeki (row ise yatay) hizalamayı, `align-items` çapraz eksendeki hizalamayı kontrol eder.

### Grid — Flexbox'un iki boyutlu hali

Kart listesi belirli sayıda sütun halinde dizilecekse grid daha rahat:

```css
.kart-listesi {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 eşit sütun */
  gap: 16px;
}
```

Kısa kural: tek yönlü diziliş (satır ya da sütun) istiyorsan flexbox, hem satır hem sütun kontrolü istiyorsan grid.

### Position

```css
.badge {
  position: relative;   /* normal akışta ama referans noktası olur */
}
.badge-etiket {
  position: absolute;   /* en yakın "relative" ebeveyne göre konumlanır */
  top: 0;
  right: 0;
}
```

`fixed` ekrana sabitlenir (scroll'dan etkilenmez, sticky header için kullanılır). `sticky` normalde akışta ama bir noktadan sonra sabitlenir (scroll ederken üstte kalan navbar gibi).

### Birimler

- `px`: sabit piksel
- `%`: ebeveyne göre yüzde
- `rem`: kök font boyutuna göre (genelde 16px), responsive tasarımda tercih edilir
- `vh`/`vw`: ekran yüksekliği/genişliğinin yüzdesi (`100vh` = tam ekran yüksekliği)

### Renkler

```css
color: #333333;              /* hex */
background-color: rgb(240, 240, 240);
background-color: rgba(0, 0, 0, 0.5); /* son değer opacity */
```

### CSS'i React'a Bağlama

LoginForm'da muhtemelen görüldüğü gibi, React'ta genelde ayrı bir `.css` dosyası yazıp component'te import edersin:

```jsx
import './KursKarti.css';

function KursKarti() {
  return <div className="kart">...</div>;
}
```

Inline style de var ama nadiren kullanılır (dinamik, hesaplanan stiller için):

```jsx
<div style={{ backgroundColor: 'red', padding: '10px' }}>
```

Dikkat: JS içinde obje olduğu için çift süslü parantez, ve CSS property'leri camelCase (`background-color` → `backgroundColor`).

---

## Kurslarım Projesi İçin Muhtemelen İhtiyaç Duyulacaklar

Kurslarım Projesi'nde muhtemelen ihtiyaç olacaklar: `.kart-listesi` için flex/grid, her `.kart` için box model + border-radius + box-shadow (hafif gölge), `:hover` ile kart üzerine gelince küçük bir animasyon. Video izlendikten sonra kod üzerinden birlikte devam edilebilir.
