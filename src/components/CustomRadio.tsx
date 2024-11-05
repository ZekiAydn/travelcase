import { Radio } from "antd";
import { CalendarOutlined, EnvironmentOutlined, GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from 'next-i18next';

export default function CustomRadio() {
    const { t } = useTranslation('common');

    return (
        <div className="relative z-10 flex justify-center pt-60">
            <Radio.Group
                defaultValue="Package"
                className="bg-gray-200 inline-flex rounded-full shadow-lg border-0 custom-radio-group"
            >
                <Radio.Button
                    value="Package"
                    className="p-4 sm:p-6 font-medium flex items-center bg-transparent border-0 custom-radio-button"
                >
                    <GlobalOutlined />
                    <span className="pl-2">{t('package')}</span>
                </Radio.Button>
                <Radio.Button
                    value="Hotel"
                    className="p-4 sm:p-6 font-medium flex items-center bg-transparent border-0 custom-radio-button"
                >
                    <CalendarOutlined />
                    <span className="pl-2">{t('hotel')}</span>
                </Radio.Button>
                <Radio.Button
                    value="Flight"
                    className="p-4 sm:p-6 font-medium flex items-center bg-transparent border-0 custom-radio-button"
                >
                    <EnvironmentOutlined />
                    <span className="pl-2">{t('flight')}</span>
                </Radio.Button>
            </Radio.Group>
        </div>
    );
}
