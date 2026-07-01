import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// JSX ile html ve javascript kodları birlikte yazılabilir.
// JSX ile yazılan kodlar, derleme sırasında javascript koduna çevrilir.

function App() {
  // javascript kodları yazılır.
  let a = 15;
  const firstName = "Barış";

  // let değişken tipi ile tanımlanan değişkenler değiştirilebilir.
  // const ile tanımlanan değişkenler ise değiştirilemez.
  let vize1 = 50;
  let vize2 = 70;

  let sonuc = true;

  let isimler = ["Barış", "Ahmet", "Mehmet", "Ayşe", "Fatma"];
  return (
    // html kodları yazılır.
    <div>
      <p> a değişkeninin değeri : {a}</p>
      <p>İsim: {firstName}</p>

      <p>Vize1: {vize1}</p>
      <p>Vize2: {vize2}</p>
      <p>Ortalama : {(vize1 + vize2) / 2}</p>

      <p>Sonuç: {sonuc ? "Geçti" : "Kaldı"}</p>

      {/* Ternary Operator: Formatı : exp ? trueValue : falseValue */}
      {
        (vize1 + vize2) / 2 >= 50 ? <p>Geçti</p> : <p>Kaldı</p>
      }

      {/* CSS ile stil verme, içteki css parantezi, dıştaki jsx parantezi */}
      {
        isimler.map((isim, index) => (
          <div style={{
            backgroundColor: index % 2 === 0 ? "gray" : "",
            border: "1px solid black"
          }} key={index}>{isim}</div>
        ))
      }
    </div >
  )
}

// Diğer dosyalarda import edip kullanabilmek için export ediyoruz.
export default App