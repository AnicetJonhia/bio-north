"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";
import Link from "next/link";


const ITEM_WIDTH = 240;

export default function CircularCarousel({ categories, locale, iconMapCategory, setSelectedCategory }) {
    const [cats, setCats] = useState(categories);

    useEffect(() => {
        setCats(categories);
    }, [categories]);


    useEffect(() => {
        const interval = setInterval(() => {

            setCats((prev) => {
                const [first, ...rest] = prev;
                return [...rest, first];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="overflow-hidden w-full">
            <motion.div
                key={cats[0]?.id}
                className="flex"
                initial={{ x: 0 }}
                animate={{ x: -ITEM_WIDTH }}
                transition={{ duration: 1, ease: "linear" }}
                onAnimationComplete={() => {

                }}
            >
                {cats.map((cat) => {
                    const Icon = iconMapCategory[cat.icon?.toLowerCase()] || Leaf;
                    return (
                        <div
                            key={cat?.id}
                            style={{ minWidth: ITEM_WIDTH }}
                            className="cursor-pointer px-2"
                            onClick={() => setSelectedCategory(cat.name)}
                        >
                            <Link href={`/products?category=${encodeURIComponent(cat?.name)}`}>
                                <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-green-600" />
                                    </div>
                                    <span className="font-medium">
                                      {locale === "en" && cat.name_en ? cat.name_en : cat.name}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
}
