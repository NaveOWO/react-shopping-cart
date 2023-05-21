import { useState } from "react";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import styled from "styled-components";
import { postCartProduct } from "../../api/cart";
import { AddCartIc } from "../../asset";
import { cartData } from "../../atoms/cartState";

import { useAddCart } from "../../hooks/useAddCart";
import QuantityCounter from "../common/QuantityCounter";

interface ProductItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export default function ProductItem({
  id,
  imageUrl,
  name,
  price,
}: ProductItemProps) {
  const { isSelected, selectProductItem } = useAddCart();
  const [count, setCount] = useState(1);
  const refresh = useRecoilRefresher_UNSTABLE(cartData);
  function getCount(count: number) {
    setCount(count);
  }

  function increaseQuantity() {
    setCount((prev) => prev + 1);
  }

  function decreaseQuantity() {
    if (count <= 1) return;
    setCount((prev) => prev - 1);
  }

  async function handleAddButtonClick() {
    const response = await postCartProduct({
      id: id,
      quantity: 1,
      product: {
        id: id,
        name: name,
        price: price,
        imageUrl: imageUrl,
      },
    });
    if (response.ok) {
      refresh();
    }
    selectProductItem();
  }

  return (
    <ProductItemContainer data-testId="product-item">
      <ProductImage src={imageUrl} />
      <InfoBox>
        <ProductInfo>
          <Name>{name}</Name>
          <Price>{price.toLocaleString()}원</Price>
        </ProductInfo>
        {isSelected ? (
          <QuantityCounter
            count={count}
            getCount={getCount}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        ) : (
          <CartButton onClick={selectProductItem}>
            <AddCartIc />
          </CartButton>
        )}
      </InfoBox>
      {isSelected && (
        <AddCartButton onClick={handleAddButtonClick}>
          장바구니 추가
        </AddCartButton>
      )}
    </ProductItemContainer>
  );
}

const ProductItemContainer = styled.li`
  width: 28.2rem;
`;

const ProductImage = styled.img`
  width: 28.2rem;
  height: 28.2rem;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.8rem 0;
`;

const ProductInfo = styled.div``;

const Name = styled.p`
  ${({ theme }) => theme.fonts.name}
`;

const Price = styled.p`
  ${({ theme }) => theme.fonts.price}
`;

const CartButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background-color: transparent;
`;

const AddCartButton = styled.button`
  width: 100%;
  height: 4rem;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
`;
