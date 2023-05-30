import { rest } from "msw";
import { CartType } from "../type/cart";

let dummy: CartType[] = [];

export const handlers = [
  rest.get("/products", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: "[23 F/W] Tom Brown",
          price: 930000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20221017/2867105/2867105_1_220.jpg",
        },
        {
          id: 2,
          name: "[23 F/W] Off White",
          price: 630000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20220726/2682017/2682017_1_220.jpg",
        },
        {
          id: 3,
          name: "[22 F/W] Pants",
          price: 450000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20230509/3284078/3284078_16836104882197_320.jpg",
        },
        {
          id: 4,
          name: "[Gucci] Leather Jacket",
          price: 1500000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20200901/1576682/1576682_6_320.jpg",
        },
        {
          id: 5,
          name: "Messenger Bag",
          price: 200000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20220426/2514819/2514819_3_320.jpg",
        },
        {
          id: 6,
          name: "chelsea boots",
          price: 4500000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20200828/1568047/1568047_24_320.jpg",
        },
        {
          id: 7,
          name: "마르지엘라 [F/W 23]",
          price: 10000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20210204/1778523/1778523_2_125.jpg",
        },
        {
          id: 8,
          name: "RC B019 BLACK GLASS",
          price: 20000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20230126/3039520/3039520_16762638204628_220.jpg",
        },
        {
          id: 9,
          name: "ACTIVITY CLUB PIGMENT OVER FIT TEE",
          price: 40000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20221017/2867105/2867105_1_220.jpg",
        },
        {
          id: 10,
          name: "크로스백 - 블랙 / BG252LL095BK999",
          price: 1470000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20230327/3181575/3181575_16830053095177_500.jpg",
        },
        {
          id: 11,
          name: "남성 와펜 패치 소프트 쉘 집업 재킷",
          price: 611000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20220404/2463979/2463979_1_500.jpg",
        },
        {
          id: 12,
          name: "척 70 빈티지 캔버스 러쉬블루 168514C ",
          price: 53000,
          imageUrl:
            "https://image.msscdn.net/images/goods_img/20200622/1493265/1493265_1_500.jpg",
        },
      ])
    );
  }),

  rest.get("/carts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummy));
  }),

  rest.post("cart-items", async (req, res, ctx) => {
    const { postData } = await req.json();
    dummy.push(postData);

    return res(ctx.status(200), ctx.json({ ok: true }));
  }),

  rest.patch("cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    dummy = dummy.map((item: CartType) => {
      if (item.product.id === +cartItemId) {
        return { ...item, quantity };
      }
      return item;
    });

    return res(ctx.status(200), ctx.json({ ok: true }));
  }),

  rest.delete("cart-items", async (req, res, ctx) => {
    const { cartItemId } = await req.json();

    dummy = dummy
      .map((item: CartType) => {
        if (cartItemId !== item.product.id) {
          return item;
        }
      })
      .filter((item: CartType | undefined) => item !== undefined) as CartType[];

    return res(ctx.status(200), ctx.json({ ok: true }));
  }),
];
