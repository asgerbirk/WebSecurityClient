'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {useEffect, useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Product} from "@/types/product";

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{product.ProductName}</CardTitle>
        <CardDescription>{product.Description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
          <Image
              src={`https://placehold.co/400x400?text=${encodeURIComponent(product.ProductName)}&font=Roboto`}
              alt={product.ProductName}
              width={200}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-4"
          />
        <p className="text-2xl font-bold">${product.Price}</p>
        <p className="text-sm text-gray-500">In stock: {product.StockQuantity}</p>
      </CardContent>
      <CardFooter>
        <Button disabled={true} className="w-full">Available in All Centers</Button>
      </CardFooter>
    </Card>
  )
}

export function Products() {
    const [products, setProducts] = useState<Product[]>([]); // State for products
    const {toast} = useToast()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Could not load products. Please try again later.',
                    variant: 'destructive',
                });
            }
        };

        fetchProducts().then(r => r);
    }, [toast]);
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map(product => (
            <ProductCard key={product.ProductID} product={product} />
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <p>&copy; 2024 Zando Fitness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}