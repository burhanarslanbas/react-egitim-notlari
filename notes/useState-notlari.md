# useState — Çalışma Notları

## 1. Neden useState Var?

- Component = fonksiyon. Her render'da baştan çalışır, normal (`let`/`const`) değişkenler sıfırlanır.
- Normal değişken değişse bile React ekranı **otomatik güncellemez** (React'a sinyal gitmez).
- **useState** iki sorunu birden çözer:
  1. Değeri render'lar arasında **hatırlar** (kalıcı hafıza)
  2. Değer değiştiğinde React'a **"yeniden render et"** der (otomatik UI güncelleme)

**.NET analojisi:** `INotifyPropertyChanged` implement eden bir property — setter çağrıldığında `OnPropertyChanged()` tetiklenmesi gibi.

## 2. Temel Syntax

```jsx
const [deger, setDeger] = useState(baslangicDegeri);
```

- `useState(x)` bir **array** döner: `[mevcut değer, setter fonksiyon]`
- İsimler serbest (array destructuring), ama **sıra sabit**: 1. değer, 2. setter
- Başlangıç değeri sadece **ilk render'da** kullanılır, sonrasında React kendi hafızasındaki değeri korur

## 3. Altın Kural: Direkt Değiştirme Yok

```jsx
deger = yeniDeger;      // ❌ React haberdar olmaz, render tetiklenmez
setDeger(yeniDeger);    // ✅ Doğru — render tetiklenir
```

**Analoji:** EF Core'da entity'yi değiştirip `SaveChanges()` çağırmamak gibi — değişiklik teknik olarak olur ama dışarıya yansımaz.

## 4. Fonksiyonel Update (Önceki Değere Bağlı Güncelleme)

```jsx
setCount(count + 1);          // ⚠️ art arda çağrılırsa riskli
setCount(prev => prev + 1);   // ✅ güvenli — React'ın en güncel değerini kullanır
```

**Neden gerekli:** React state güncellemelerini **batch** yapar; aynı fonksiyon içinde art arda `setCount(count + 1)` çağırırsan, `count` değişkeni hâlâ eski (closure'daki) değeri taşır. Sonuç beklediğin gibi olmaz.

**Canlı test (Counter component'inde):**
```jsx
const handleIncrementTwice = () => {
  setCount(count + 1);
  setCount(count + 1);
}; // Sonuç: +1 (beklenen +2 değil!)

const handleIncrementTwiceSafe = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}; // Sonuç: +2 (doğru)
```

## 5. Object/Array State

```jsx
// ❌ Yanlış — objeyi yerinde (mutasyonla) değiştirme
user.name = 'Ahmet';

// ✅ Doğru — spread operator ile yeni obje oluştur
setUser({ ...user, name: 'Ahmet' });
```

React state'i **immutable** (değişmez) kabul eder. Var olan objeyi mutasyona uğratırsan referans aynı kalır, React "değişmemiş" sanır ve render tetiklenmez.

**Analoji:** C# `record` tipindeki `with` expression:
```csharp
var updatedUser = user with { Name = "Ahmet" };
```

### Dinamik Key ile Tek Fonksiyonla Çoklu Alan Güncelleme

```jsx
const [formData, setFormData] = useState({ username: '', password: '' });

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};
```

- `[name]: value` → **computed property name**. `name` değişkeninin *değerini* obje key'i olarak kullanır.
- Input'lara `name="username"` / `name="password"` attribute'u verildiğinde, aynı `handleChange` fonksiyonu hangi alanın güncelleneceğini `e.target.name`'den anlar.
- **Analoji:** `Dictionary<string, string>` üzerinde `dict[key] = value` — key runtime'da dinamik belirleniyor.

## 6. `e` (Event Object) Nedir?

```jsx
<input onChange={(e) => setUsername(e.target.value)} />
```

- `e` = event object, React tarafından otomatik geçirilir (isim senin seçimin, genelde `e`).
- `e.target` → olayı tetikleyen DOM elementi (burada `<input>`)
- `e.target.value` → o elementin o anki değeri
- `e.target.name` → elementin `name` attribute'u (dinamik handleChange için kullanılır)

**Analoji:** WinForms/WPF'teki event handler imzası:
```csharp
private void TextBox1_TextChanged(object sender, EventArgs e)
{
    string yeniDeger = ((TextBox)sender).Text;
}
```
`e` (EventArgs) → React'taki `e`, `sender` → React'ta `e.target`.

## 7. Conditional Rendering — `&&` Operatörü

```jsx
{errorMessage && <p className="error-message">{errorMessage}</p>}
```

- JS'te `&&`: soldan sağa değerlendirir, ilk **falsy** değeri bulunca durur ve onu döner. Sol taraf truthy ise sağ tarafı döner.
- React, `false`/`null`/`undefined`/`0` gibi falsy değerleri **hiçbir şey render etme** olarak yorumlar; JSX elementi dönerse onu basar.
- Sonuç: `errorMessage` boşsa (`null`) → hiçbir şey görünmez. Doluysa → `<p>` render edilir.

**Analoji:** Ternary'nin `else`siz hali:
```csharp
string result = errorMessage != null ? $"<p>{errorMessage}</p>" : null;
```

⚠️ **Dikkat:** `errorMessage` yerine `count` gibi bir sayı state'i kullanırsan ve değeri `0` olabiliyorsa, `count && <div>...</div>` beklenmedik şekilde ekranda `0` render edebilir. `null`/boş string kullanılan durumlarda sorun yok.

## 8. Form Submit — `e.preventDefault()`

```jsx
const handleSubmit = (e) => {
  e.preventDefault(); // sayfanın yenilenmesini engeller
  // ...
};

<form onSubmit={handleSubmit}>
```

- Normalde HTML formu submit olduğunda sayfa **yenilenir** (tam reload — .NET Web Forms'taki postback gibi).
- React SPA mantığında bunu istemeyiz, `e.preventDefault()` ile varsayılan davranışı durdururuz.
- `onSubmit` (form'a bağlı) tercih edilir, `onClick` (butona bağlı) değil — çünkü `onSubmit` hem tıklamayı hem Enter tuşunu yakalar.

## 9. JSX'e Özgü İsimlendirme Farkları

| HTML | JSX | Neden |
|---|---|---|
| `for` | `htmlFor` | `for`, JS'in reserved keyword'ü (döngü) |
| `class` | `className` | `class`, JS'in reserved keyword'ü |

---

## Pratik Yapılan Component'ler

- **Counter** → fonksiyonel update (`prev => prev + 1`) pratiği için kullanıldı
- **LoginForm** → object state, dinamik `handleChange`, conditional rendering, form submit pratiği için kullanıldı (gerçekçi tasarım + CSS ile)

## Sonraki Konu

**useEffect** — component'in "yan etkilerini" (side effects) yönetme, örn: component ekrana geldiğinde API'den veri çekme.