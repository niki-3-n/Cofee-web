import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  ingredients: string[];
  tags: string[];
}

interface MenuCategories {
  [key: string]: MenuItem[];
}

const menuCategories: MenuCategories = {
  coffee: [
    {
      id: 1,
      name: 'Эспрессо',
      description: 'Классический итальянский кофе',
      price: '299₽',
      image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=500',
      ingredients: ['100% Арабика', 'Темная обжарка'],
      tags: ['Классика', 'Бодрящий']
    },
    // ...другие позиции кофе...
  ],
  desserts: [
    {
      id: 1,
      name: 'Чизкейк Нью-Йорк',
      description: 'Классический американский чизкейк',
      price: '399₽',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500',
      ingredients: ['Сливочный сыр', 'Ванилин', 'Песочное тесто'],
      tags: ['Хит продаж', 'Классика']
    },
    // ...другие десерты...
  ],
  breakfast: [
    {
      id: 1,
      name: 'Авокадо тост',
      description: 'Тост с авокадо и яйцом пашот',
      price: '459₽',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500',
      ingredients: ['Авокадо', 'Яйцо пашот', 'Зерновой хлеб'],
      tags: ['Здоровое питание', 'Завтрак']
    },
    // ...другие позиции завтраков...
  ]
};

const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('coffee');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.section
      ref={ref}
      className="menu-section"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeIn}
      id="menu"
    >
      <h2>Наше меню</h2>
      
      <motion.div className="menu-categories" variants={fadeIn}>
        {Object.keys(menuCategories).map((category) => (
          <motion.button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category === 'coffee' ? 'Кофе' :
             category === 'desserts' ? 'Десерты' :
             'Завтраки'}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className="menu-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {menuCategories[selectedCategory].map((item) => (
          <motion.div
            key={item.id}
            className="menu-card"
            variants={fadeIn}
            whileHover={{ y: -10 }}
          >
            <div className="menu-image">
              <LazyLoadImage
                src={item.image}
                alt={item.name}
                effect="blur"
                width="100%"
                height="200px"
              />
              <div className="menu-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="menu-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="menu-info">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="price">{item.price}</p>
              <div className="ingredients">
                {item.ingredients.map((ingredient, index) => (
                  <span key={index} className="ingredient-tag">{ingredient}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default MenuSection;