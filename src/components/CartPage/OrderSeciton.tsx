import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

import { cartState } from "../../atoms/cartState";
import { useRefreshableRecoilValue } from "../../hooks/useRefreshableAtom";

export default function OrderSection() {
  const cartsData = useRefreshableRecoilValue(cartState);
  const [deliveryFee, setDeliveryFee] = useState(0);

  useEffect(() => {
    if (cartsData.length >= 1) {
      setDeliveryFee(3000);
      return;
    }
    setDeliveryFee(0);
  }, [cartsData]);

  return (
    <Container>
      <OrderTitle>결제예상금액</OrderTitle>
      <ProductInfo>
        <InfoTitle>총 상품가격</InfoTitle>
        <InfoPrice>
          {cartsData.reduce(
            (totalPrice, currentPrice) =>
              totalPrice + currentPrice.quantity * currentPrice.product.price,
            0
          )}
        </InfoPrice>
      </ProductInfo>
      <ProductInfo>
        <InfoTitle>총 배송비</InfoTitle>
        <InfoPrice>{deliveryFee} </InfoPrice>
      </ProductInfo>
      <TotalProduct>
        <InfoTitle>총 주문금액</InfoTitle>
        <InfoPrice>
          {cartsData.reduce(
            (totalPrice, currentPrice) =>
              totalPrice + currentPrice.quantity * currentPrice.product.price,
            0
          ) + deliveryFee}
        </InfoPrice>
      </TotalProduct>
      <OrderButton>주문하기</OrderButton>
    </Container>
  );
}

const Container = styled.article`
  position: sticky;
  top: 5rem;

  width: 44.8rem;
  height: 41rem;

  padding: 3.5rem 3.6rem;
  margin-top: 5.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray100};
`;

const OrderTitle = styled.h3`
  height: 4.6rem;

  ${({ theme }) => theme.fonts.order_title};

  color: ${({ theme }) => theme.colors.gray100};
  border-bottom: 0.3rem solid ${({ theme }) => theme.colors.gray100};
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  margin-top: 2rem;
`;

const InfoTitle = styled.strong`
  ${({ theme }) => theme.fonts.order_info}
  color: ${({ theme }) => theme.colors.primary};
`;

const InfoPrice = styled.div`
  ${({ theme }) => theme.fonts.order_info}
  color: ${({ theme }) => theme.colors.primary};
`;

const TotalProduct = styled(ProductInfo)`
  margin-top: 4.1rem;
`;

const OrderButton = styled.button`
  width: 38rem;
  height: 7.3rem;

  margin-top: 4.6rem;

  ${({ theme }) => theme.fonts.h2}
`;
