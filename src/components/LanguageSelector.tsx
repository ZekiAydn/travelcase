import { Dropdown, Menu } from 'antd';
import Image from 'next/image';
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { MenuProps } from 'antd';

const LanguageSelector = () => {
    const router = useRouter();
    const { pathname, asPath, query } = router;
    const [selectedLanguage, setSelectedLanguage] = useState<string>((router.locale as string) || "en");

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        setSelectedLanguage(key);
        router.push({ pathname, query }, asPath, { locale: key });
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="en">
                <div className="flex items-center space-x-2">
                    <Image src="/gb.png" alt="English" width={20} height={12} />
                    <span>EN</span>
                </div>
            </Menu.Item>
            <Menu.Item key="tr">
                <div className="flex items-center space-x-2">
                    <Image src="/trflag.png" alt="Türkçe" width={20} height={12} />
                    <span>TR</span>
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="top-4 right-4 z-50">
            <Dropdown overlay={menu} trigger={['click']}>
                <div className="flex items-center cursor-pointer">
                    <Image
                        src={selectedLanguage === "en" ? "/gb.png" : "/trflag.png"}
                        alt={selectedLanguage.toUpperCase()}
                        width={20}
                        height={12}
                    />
                    <span className="ml-2">{selectedLanguage.toUpperCase()}</span>
                    <DownOutlined className="w-3 h-2 ml-0.5" />
                </div>
            </Dropdown>
        </div>
    );
};

export default LanguageSelector;
