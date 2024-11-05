import React from "react";
import Image from "next/image";
import MobileDrawer from "@/components/Drawer";
import { useTranslation } from 'next-i18next';

const Header: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <div className="bg-white">
            <div className="container mx-auto flex justify-between items-center px-4 py-4">
                <a href={'/#'} className="flex items-center space-x-3">
                    <Image src="/logo.png" alt="TravelGo Logo" width={200} height={100} />
                </a>
                <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
                    <a href="#" className="hover:text-gray-900">{t('popularDestinations')}</a>
                    <a href="#" className="hover:text-gray-900">{t('topHotels')}</a>
                    <a href="#" className="hover:text-gray-900">{t('lastMinute')}</a>
                    <a href="#" className="hover:text-gray-900">{t('recommended')}</a>
                    <a href="#" className="hover:text-gray-900">{t('charterAntalya')}</a>
                    <a href="#" className="hover:text-gray-900">{t('cityBreakIstanbul')}</a>
                </div>
                <div className="md:hidden">
                    <MobileDrawer />
                </div>
            </div>
        </div>
    );
};

export default Header;
