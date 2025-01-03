'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Edit, Trash2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product"; // Update with your Product type

export function AdminProducts() {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const { toast } = useToast()

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
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [toast]);

    const filteredProducts = products.filter(product =>
        product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.Description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/products/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            setProducts(prevProducts => prevProducts.filter(product => product.ProductID !== id));

            toast({
                title: "Success",
                description: "Product deleted successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not delete product. Please try again later.",
                variant: "destructive",
            });
        }
    };

    const handleEdit = async (id: number, updatedProduct: Partial<Product>) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ZANDO_API}/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const updatedData = await response.json();

            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.ProductID === id ? { ...product, ...updatedData } : product
                )
            );

            toast({
                title: "Success",
                description: "Product updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not update product. Please try again later.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto px-4 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Management</CardTitle>
                        <CardDescription>View and manage Zando Fitness products</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center mb-6">
                            <div className="relative w-64">
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                            <Button>Add New Product</Button>
                        </div>

                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProducts.map((product) => (
                                        <TableRow key={product.ProductID}>
                                            <TableCell>{product.ProductName}</TableCell>
                                            <TableCell>{`$${product.Price}`}</TableCell>
                                            <TableCell>{product.StockQuantity}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button variant="outline" size="icon" onClick={() => handleEdit(product.ProductID, product)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(product.ProductID)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}

                        {!isLoading && filteredProducts.length === 0 && (
                            <div className="text-center py-4">
                                <p className="text-gray-500">No products found</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>

            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4">
                    <p>&copy; 2024 Zando Fitness. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
