# useEffect — Çalışma Notları

## 1. Neden useEffect Var?

- Component fonksiyonu her render'da baştan çalışır.
- API isteği gibi "dış dünyayla" ilgili işlemler (**side effect**) direkt component gövdesine yazılırsa, her render'da tekrar çalışır → **sonsuz döngü** riski.
- useEffect, side effect kodunun **ne zaman** çalışacağını kontrol etmeyi sağlar.
- Çalışma zamanı: **render bittikten sonra** — ekranın çizilmesini bloklamaz.

## 2. Temel Syntax

```jsx
useEffect(() => {
  // side effect kodu
}, [dependencies]);
```

## 3. Dependency Array — 3 Hal

| Kalıp | Ne zaman çalışır |
|---|---|
| `useEffect(() => {...})` | Her render sonrası (nadiren istenir, performans riski) |
| `useEffect(() => {...}, [])` | Sadece component ilk render olduğunda (**mount**) — 1 kere |
| `useEffect(() => {...}, [x, y])` | `x` veya `y` değiştiğinde tekrar çalışır |

### ⚠️ Sık Hata: Kullanılan Değişkeni Dependency'e Eklememek

```jsx
// ❌ userId kullanılıyor ama array'de yok → userId değişince güncellenmez
useEffect(() => {
  fetch(`/api/users/${userId}`)...
}, []);

// ✅ Doğrusu
useEffect(() => {
  fetch(`/api/users/${userId}`)...
}, [userId]);
```

**Kural:** useEffect içinde kullanılan, component dışından gelen (prop/state) her değişken dependency array'e eklenmeli. ESLint (`react-hooks/exhaustive-deps`) bunu otomatik uyarır.

## 4. Cleanup Fonksiyonu

useEffect, isteğe bağlı bir fonksiyon **return edebilir** — bu iki durumda çalışır:
1. Component ekrandan kaldırıldığında (**unmount**)
2. Effect tekrar çalışmadan hemen önce (eski effect temizlenir)

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log('tik'), 1000);
  return () => clearInterval(timer); // temizlik
}, []);
```

**Neden gerekli:** Temizlenmezse component kaldırılsa bile timer/listener arkada çalışmaya devam eder → **memory leak**.

**Analoji:** C# `IDisposable` + `using` bloğu — blok bitince otomatik `Dispose()` çağrılması gibi.

## 5. async/await Kullanımı — Dikkat

```jsx
// ❌ YANLIŞ — callback doğrudan async olamaz (Promise döner, React karışır)
useEffect(async () => {
  const res = await fetch('/api/user');
}, []);

// ✅ DOĞRU — içeride ayrı async fonksiyon tanımla, hemen çağır
useEffect(() => {
  const fetchUser = async () => {
    const res = await fetch('/api/user');
    const data = await res.json();
    setUser(data);
  };
  fetchUser();
}, []);
```

## 6. Class Component Lifecycle Karşılığı (Referans İçin)

| Eski (Class Component) | useEffect Karşılığı |
|---|---|
| `componentDidMount()` | `useEffect(() => {...}, [])` |
| `componentDidUpdate()` | `useEffect(() => {...}, [dependency])` |
| `componentWillUnmount()` | `useEffect(() => { return () => {...} }, [])` |

## 7. Birden Fazla useEffect Kullanımı

Her useEffect'i kendi ilgi alanına göre ayrı tutmak yaygın ve doğru bir pratik (single responsibility):

```jsx
useEffect(() => {
  document.title = `Profil: ${userId}`;
}, [userId]);

useEffect(() => {
  fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => setUser(data));
}, [userId]);
```

## 8. Örnek Kullanım: LoginForm'a Sayfa Başlığı Ekleme

```jsx
useEffect(() => {
  document.title = 'Giriş Yap';

  return () => {
    document.title = 'React App'; // unmount olunca eski hale dön
  };
}, []);
```

## 9. .NET Analojileri Özet

| useEffect Kavramı | .NET Karşılığı |
|---|---|
| `useEffect(() => {...}, [])` | `Form_Load` / constructor — bir kere çalışır |
| `useEffect(() => {...}, [dep])` | `PropertyChanged` event — belirli alan değişince tetiklenir |
| Cleanup fonksiyonu | `IDisposable.Dispose()` (`using` bloğu ile) |

## 10. "Render" Tam Olarak Ne Demek?

Render = **React'ın component fonksiyonunu çağırıp, JSX çıktısını yeniden hesaplaması**. Ekrana çizmek değil, "ekranda ne olması gerektiğine karar vermek."

### Render'ın 2 Aşaması
1. **Render aşaması** — component fonksiyonu çalışır, JSX (taslak) hesaplanır, henüz DOM'a dokunulmaz
2. **Commit aşaması** — hesaplanan taslak gerçek DOM'a yazılır, ekranda görünür hale gelir

useEffect **commit'ten sonra** çalışır — yani DOM zaten güncellenmiş ve hazır olduğunda.

### Render'ı Tetikleyen 2 Şey
1. Component'in **kendi state'i** değişti (`setX` çağrıldı)
2. **Parent component** yeniden render oldu (props değişmese bile, tüm child'lar da yeniden render olur — ileride `React.memo` ile optimize edilebilir)

### Zihinde Oturması Gereken Döngü
```
State değişir (setX)
   ↓
Render (fonksiyon yeniden çalışır, yeni JSX hesaplanır)
   ↓
Commit (fark olan kısımlar gerçek DOM'a yazılır)
   ↓
useEffect'ler çalışır (dependency array'e uyanlar tetiklenir)
   ↓
useEffect içinde setX çağrılırsa → başa dön
```

**Analoji:** Bir C# metodunun her çağrılışında yeni bir sonuç üretmesi gibi — `RenderCounter(count)` her `count` değiştiğinde tekrar çağrılıp yeni string döner. Farkı: React bu çağrıyı senin yerine otomatik yapar.

## 11. DOM Nedir?

**DOM (Document Object Model)** — tarayıcının HTML sayfasını bellekte **ağaç yapısında bir obje** olarak tuttuğu temsil. Her HTML etiketi bir *node*, JavaScript bu ağaca erişip değiştirebilir (`document.getElementById(...)`).

### Neden React Doğrudan DOM'a Yazmıyor?
Gerçek DOM'u elle sık sık değiştirmek yavaştır (her değişiklikte tarayıcı reflow/repaint yapar). React bunun yerine:

1. **Virtual DOM** kullanır — gerçek DOM'un JS'te tutulan hafif kopyası
2. `setX` çağrıldığında önce yeni Virtual DOM hesaplanır (render)
3. Eski ve yeni Virtual DOM **karşılaştırılır** (diffing) — sadece fark bulunur
4. Sadece değişen kısım gerçek DOM'a yazılır (commit)

**Analoji:** EF Core'un `SaveChanges()` çağrıldığında sadece değişen kolonlar için `UPDATE` SQL'i üretmesi gibi — "her şeyi değil, sadece gerçekten değişeni güncelle."

Bu yüzden `document.title = '...'` gibi DOM'a doğrudan dokunan kodları useEffect içine yazıyoruz — o an gerçek DOM zaten commit edilmiş ve güncel durumda, güvenle işlem yapılabilir.

## Sonraki Konu

**Debug** — React DevTools ve VSCode ile component/state debug etme. Bölüm 1'in son konusu, ardından Bölüm 3 (Axios) ile gerçek API bağlantısına geçilecek.