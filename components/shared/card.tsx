import { Button } from '../ui/button';

type Product = {
  photo: string;
  name: string;
  ingredients: string;
  price: string;
};

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    <article className="lg:w-[32%] p-4 bg-[#ffff] w-[49%] mb-4 flex justify-between flex-col">
      <img src={product.photo} alt="/" />
      <div className="flex flex-col sm:gap-12 gap-4">
        <div>
          <b className="sm:text-2xl">{product.name}</b>
          <p>{product.ingredients}</p>
        </div>
        <div className="flex justify-between sm:flex-row flex-col sm:gap-0 gap-2">
          <b className="sm:text-2xl">{product.price} ₽</b>
          <Button variant="card" size="card" className="bg-[url('/bt_bg.svg')]">
            Заказать
          </Button>
        </div>
      </div>
    </article>
  );
}
