'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="header container">
      <a href="/" className="logo">
        <Image src="/img/FASTBOT.svg" alt="logo" width={120} height={40} />
      </a>
      <h3>Faça seu Pedido</h3>
      <div className="buttons">
        <button className="button" onClick={() => setCartOpen(true)}>
          <Image src="/img/shopping-cart.svg" alt="carrinho" width={20} height={20} />
          <span className="button-text">Carrinho</span>
          <span className="cart-counter">0</span>
        </button>
      </div>
      <button id="botao-especial" className="button" style={{ display: 'none' }}>
        Botão Especial
      </button>
    </header>
  );
}
