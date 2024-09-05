// 변지윤
// 찜 리스트
import React, { useEffect, useState } from 'react'
import styles from '../styles/pages/WishList.module.css'
import { CustomProduct, CustomSelect } from './Cart'
import { Product, WishList as WishListType } from '../types/type';
import { deleteWishList, getWishLists } from '../services/wishListServices';
import { getProducts } from '../services/productServices';


export default function WishList() {
  const [wishLists, setWishLists] = useState<WishListType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchWishLists = async () => {
      const fetchedWishLists = await getWishLists();
      const filterUser = fetchedWishLists.filter(i => i.userId === 1);
      setWishLists(filterUser);
    };
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchWishLists();
    fetchProducts();
  },[]);

  // 장바구니 제품 삭제
  const handleDeleteWishList = async (id: number) => {
    try {
      await deleteWishList(id);
      setWishLists(wishLists.filter((wish) => wish.id != id));
      alert('SUCCESS wishlist delete');
    } catch (error) {
      console.log(error);
      alert('FAIL wishlist delete');
    }
  };

  return (
    <div className={styles.wish__container}>
      <CustomSelect />

      {wishLists.map(item => {
        const product = products.find(p => p.id == item.productId);
        return (
          <div key={item.id}>
            {product && (    
              <CustomProduct 
                descClassName={styles.wish__desc} 
                imgClassName={styles.wish__img} 
                titleClassName={styles.wish__title} 
                contextClassName={styles.wish__context}
                product={product}
                handleDeleteWishList={() => handleDeleteWishList(item.id)}
              />
            )}
          </div>
        )
      })}

    </div>
  )
}