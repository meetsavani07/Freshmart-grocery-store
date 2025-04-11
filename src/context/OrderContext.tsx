import React, { createContext, useContext, useState, useEffect } from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  orderDate: string;
  status: 'pending' | 'delivered' | 'cancelled';
}

interface OrderContextType {
  orders: OrderItem[];
  addOrder: (items: any[]) => void;
  clearOrders: () => void;
  deleteOrder: (orderId: number, orderDate: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (items: any[]) => {
    const newOrders = items.map(item => ({
      ...item,
      orderDate: new Date().toISOString(),
      status: 'pending' as const
    }));
    setOrders(currentOrders => [...newOrders, ...currentOrders]);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const deleteOrder = (orderId: number, orderDate: string) => {
    setOrders(currentOrders => 
      currentOrders.filter(order => 
        !(order.id === orderId && order.orderDate === orderDate)
      )
    );
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      clearOrders,
      deleteOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};