import Categories from '@/components/shared/headerComponents/Categories/Categories';
import { Container } from '@/components/shared/container';
import Banner from './components/Banner';
import Features from './components/Features';
import Promotion from './components/Promotion';
import AboutUs from './components/AboutUs';
import CardsContainer from '@/components/shared/cardsContainer';

const ms = [
  {
    category: 'Pizza',
    id: '1',
    products: [
      {
        photo: '/roll_test.png',
        name: 'Margherita',
        ingredients: 'Tomato sauce, mozzarella, basil, olive oil',
        price: '550',
      },
      {
        photo: 'roll_test.png',
        name: 'Pepperoni',
        ingredients: 'Tomato sauce, mozzarella, pepperoni',
        price: '650',
      },
      {
        photo: 'roll_test.png',
        name: 'Hawaiian',
        ingredients: 'Tomato sauce, mozzarella, ham, pineapple',
        price: '600',
      },
      {
        photo: 'roll_test.png',
        name: 'Four Cheese',
        ingredients: 'Creamy sauce, mozzarella, gorgonzola, parmesan, emmental',
        price: '750',
      },
      {
        photo: 'roll_test.png',
        name: "Meat Lover's",
        ingredients: 'Tomato sauce, mozzarella, sausage, ham, bacon, pepperoni',
        price: '800',
      },
      {
        photo: 'roll_test.png',
        name: 'Vegetarian',
        ingredients:
          'Tomato sauce, mozzarella, mushrooms, peppers, onion, olives, tomatoes',
        price: '700',
      },
      {
        photo: 'roll_test.png',
        name: 'Mushroom',
        ingredients:
          'Creamy sauce, mozzarella, mushrooms, onion, garlic, herbs',
        price: '680',
      },
      {
        photo: 'roll_test.png',
        name: 'BBQ',
        ingredients: 'BBQ sauce, mozzarella, chicken, onion, peppers, corn',
        price: '780',
      },
      {
        photo: 'roll_test.png',
        name: 'Neapolitan',
        ingredients:
          'Tomato sauce, mozzarella, anchovies, capers, olives, oregano',
        price: '720',
      },
      {
        photo: 'roll_test.png',
        name: 'Rustic',
        ingredients:
          'Tomato sauce, mozzarella, potatoes, mushrooms, bacon, rosemary',
        price: '850',
      },
    ],
  },
  {
    category: 'Roll',
    id: '2',
    products: [
      {
        photo: 'roll_test.png',
        name: 'California Roll',
        ingredients: 'Crab stick, avocado, cucumber, rice, nori, sesame seeds',
        price: '450',
      },
      {
        photo: 'roll_test.png',
        name: 'Philadelphia Roll',
        ingredients: 'Salmon, cream cheese, cucumber, rice, nori',
        price: '500',
      },
      {
        photo: 'roll_test.png',
        name: 'Spicy Tuna Roll',
        ingredients: 'Tuna, spicy mayo, cucumber, rice, nori',
        price: '550',
      },
      {
        photo: 'roll_test.png',
        name: 'Dragon Roll',
        ingredients: 'Eel, avocado, cucumber, rice, nori, unagi sauce',
        price: '600',
      },
      {
        photo: 'roll_test.png',
        name: 'Vegetable Roll',
        ingredients: 'Avocado, cucumber, carrot, bell pepper, rice, nori',
        price: '400',
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <Container>
        <h1 className="xl:text-4xl font-medium mb-6 mt-16 ml-4 text-2xl">
          Категории
        </h1>
      </Container>
      <Categories />
      <Banner />
      <Features />

      <div className="bg-[rgb(251,251,251)] px-4">
        {ms.map((category) => (
          <CardsContainer
            key={category.category}
            title={category.category}
            id={category.id}
            products={category.products}
          />
        ))}
      </div>

      <Promotion />
      <AboutUs />
    </>
  );
}
