# Props

Componentler arası veri taşımaya yarayan yapılara **props** denir. Bu isim `property` kelimesinden gelir.

## Kullanım

Bir componente veri, JSX üzerinde attribute gibi yazılarak geçirilir:

```jsx
<Product productName="Laptop" productPrice="17000 TL" />
<Product productName={productName} productPrice={productPrice} />
```

Component tarafında bu değerlere `props` parametresi üzerinden erişilir. Genelde okunabilirlik için **destructuring** ile alınır:

```jsx
function Product({ productName, productPrice }) {
  // Destructuring kullanılmasaydı:
  // const { productName, productPrice } = props;

  return (
    <div>
      <div>İsim: {productName}</div>
      <div>Fiyat: {productPrice}</div>
    </div>
  );
}
```

## İç İçe Component Yapısı (children)

Bir componentin içine başka bir component yerleştirerek iç içe bir yapı oluşturulabilir. Bunun için kapsayan (wrapper) component, `props.children` adında özel bir prop alır ve bunu JSX içinde `{children}` olarak kullanır:

```jsx
function Container({ children }) {
  return (
    <div>
      <div>Container Componenti</div>
      <hr />
      <div>{children}</div>
    </div>
  );
}
```

Kullanımı:

```jsx
<Container>
  <Product productName={productName} productPrice={productPrice} />
</Container>
```

Burada `Container` etiketleri arasına yazılan her şey, `Container` componentine `children` prop'u olarak otomatik geçirilir.

> Bu yapı, C#'taki parametreli metot mantığına benzer: `Container`, tıpkı bir metodun parametre alması gibi, içine konan component'i (children) parametre olarak alıp kendi çıktısının içine yerleştirir.
