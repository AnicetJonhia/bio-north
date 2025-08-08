"use client"


import type React from "react";
import {useLanguage} from "@/contexts/language-context";

export default function Loading() {
    const { t } = useLanguage()
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{t.common.loading}</p>
            </div>
        </div>
    )
}