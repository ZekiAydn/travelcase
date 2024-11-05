import { useState } from "react";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useTranslation } from 'next-i18next';

export default function MobileDrawer() {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const { t } = useTranslation('common');

    const toggleDrawer = () => setDrawerVisible(!drawerVisible);

    return (
        <>
            <Button type="text" icon={<MenuOutlined />} onClick={toggleDrawer} />
            <Drawer
                title={t('menu')}
                placement="right"
                onClose={toggleDrawer}
                open={drawerVisible}
                className="text-gray-700"
            >
                <nav className="flex flex-col space-y-4 text-sm font-medium">
                    <a href="#" className="hover:text-gray-900">{t('popularDestinations')}</a>
                    <a href="#" className="hover:text-gray-900">{t('topHotels')}</a>
                    <a href="#" className="hover:text-gray-900">{t('lastMinute')}</a>
                    <a href="#" className="hover:text-gray-900">{t('recommended')}</a>
                    <a href="#" className="hover:text-gray-900">{t('charterAntalya')}</a>
                    <a href="#" className="hover:text-gray-900">{t('cityBreakIstanbul')}</a>
                </nav>
            </Drawer>
        </>
    );
}
