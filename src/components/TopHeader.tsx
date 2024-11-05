import React from "react";
import { HeartOutlined, PhoneOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TopMenuDrawer from "@/components/TopDrawer";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from 'next-i18next';

const TopHeader: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <div className="flex flex-col space-y-2 bg-gray-100 py-2 border-b border-gray-200">
            <div className="container mx-auto flex justify-end items-center px-4 text-gray-600 text-sm">
                <div className="md:hidden">
                    <TopMenuDrawer />
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <span className="hover:text-gray-800 cursor-pointer">{t('b2bPlatform')}</span>
                    <span className="hover:text-gray-800 cursor-pointer">{t('clientCare')}</span>
                    <span className="hover:text-gray-800 cursor-pointer">{t('contact')}</span>
                    <div className="flex items-center space-x-1">
                        <PhoneOutlined className="text-base text-orange-300" />
                        <span className="hover:text-gray-800 cursor-pointer">{t('phoneNumber')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <HeartOutlined className="text-base text-orange-300" />
                        <span className="hover:text-gray-800 cursor-pointer">{t('favorite')}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Input
                            placeholder={t('searchPlaceholder')}
                            prefix={<SearchOutlined style={{ color: 'orange' }} />}
                            className="w-48 text-sm ml-6"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <LanguageSelector />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TopHeader;
