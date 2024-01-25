type ProductCategory = "fruit" | "vegetable";

interface BaseProduct {
  id: number;
  price: number;
  name: string;
}

interface FruitProduct extends BaseProduct {
  color: string;
  category: Extract<ProductCategory, "fruit">;
}
interface VegetableProduct extends BaseProduct {
  ferm: string;
  category: Extract<ProductCategory, "vegetable">;
}
type DiscountType = {
  [key in ProductCategory]: number;
};

type Product = FruitProduct | VegetableProduct;
const products = [
  { id: 333, price: 30, name: "apple", color: "red", category: "fruit" },
  { id: 999, price: 30, name: "apple", ferm: "siberia", category: "vegetable" },
];

const discountSum = (price: number, discount: number) => {
  return (price * discount) / 100;
};

function calculateTotal(products: Product[], discounts: DiscountType) {
  const price = products.reduce(
    ({ totalWithoutDiscount, totalWithDiscount }, { price, category }) => {
      totalWithoutDiscount += price;
      const discount = discounts[category];
      totalWithDiscount += discountSum(price, discount);

      return { totalWithoutDiscount, totalWithDiscount };
    },
    { totalWithoutDiscount: 0, totalWithDiscount: 0 },
  );

  return {
    ...price,
    discount: discounts,
    items: products,
  };
}

const discountPercentage = { fruit: 10, vegetable: 30 };

const result = calculateTotal(products, discountPercentage);

console.log(result.totalWithoutDiscount, "totalWithoutDiscount");
console.log(result.totalWithDiscount, "totalWithDiscount");
