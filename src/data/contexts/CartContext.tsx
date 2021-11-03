import { createContext, useCallback, useEffect, useRef, useState } from "react";

type CartContextType = {
    items
    isBagOpen
    setBagOpen
    cartTotal
  }

export const CartContext = createContext({} as CartContextType );
export const AddCartContext = createContext(item => {});
export const RemoveCartContext = createContext(item => {});

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isBagOpen, setBagOpen] = useState(false)
    const itemsRef = useRef(items);
    itemsRef.current = items;
    const [cartTotal, setCartTotal] = useState(0);
    
    useEffect(() => {
        setCartTotal(Math.trunc(items.reduce((acc, item) => acc + item.price, 0) * 100) / 100);
    }, [items])

    return (
        <AddCartContext.Provider
            value={useCallback(item => {
                if (Array.isArray(item)) {
                    setItems([...itemsRef.current, ...item])
                }
                else {
                    setItems([...itemsRef.current, item]);
                }
                
            }, [])}
        >
            <RemoveCartContext.Provider
                value={useCallback(index => {
                    const newItems = itemsRef.current.filter(
                        (_item, itemIndex) => itemIndex !== index
                    );
                    setItems(newItems);
                }, [])}
            >
                <CartContext.Provider value={{items, isBagOpen, setBagOpen, cartTotal}}>{children}</CartContext.Provider>
            </RemoveCartContext.Provider>
        </AddCartContext.Provider>
    );
}