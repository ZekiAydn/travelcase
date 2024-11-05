import { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined, PhoneOutlined, HeartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useTranslation } from 'next-i18next';
import LanguageSelector from "@/components/LanguageSelector";

export default function TopMenuDrawer() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const { t } = useTranslation('common');

    const toggleDrawer = () => setDrawerVisible(!drawerVisible);

    return (
        <>
            <Button type="text" icon={<MenuOutlined />} onClick={toggleDrawer} />
            <Drawer
                title={t('menu')}
                placement="top"
                onClose={toggleDrawer}
                open={drawerVisible}
                className="text-gray-700"
            >
                <div className="flex flex-col space-y-4 text-sm">
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
                    <div className="flex items-center space-x-2">
                        <LanguageSelector />
                    </div>
                </div>
            </Drawer>
        </>
    );
}
