import { CalendarOutlined, EnvironmentOutlined, MoonOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Input, Select } from "antd";
import { useState } from "react";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import moment from "moment";

const { Option } = Select;

export default function SearchFilter() {
    const { t } = useTranslation('common');
    const router = useRouter();

    const [filters, setFilters] = useState({
        from: "",
        destination: "",
        date: "",
        nights: "1 Night",
        people: "2 People",
    });

    const handleSearchClick = () => {
        const queryString = new URLSearchParams(filters as Record<string, string>).toString();
        router.push(`/result?${queryString}`);
    };

    const nightOptions = Array.from({ length: 30 }, (_, i) => `${i + 1} ${t('night', { count: i + 1 })}`);
    const peopleOptions = Array.from({ length: 30 }, (_, i) => `${i + 1} ${t('person', { count: i + 1 })}`);

    return (
        <div
            className="p-2 bg-opacity-40 max-w-7xl bg-white justify-self-center justify-between relative z-10 mt-10 flex flex-col lg:flex-row items-center sm:px-4">
            <div
                className="bg-white rounded-lg shadow-lg p-4 w-full max-w-6xl m-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mx-auto">
                <div className="flex items-center w-full sm:w-1/4">
                    <EnvironmentOutlined className="text-gray-700 text-xl"/>
                    <Input
                        variant="borderless"
                        size="small"
                        placeholder={t('from')}
                        className="text-gray-700 w-full"
                        value={filters.from}
                        onChange={(e) => setFilters({ ...filters, from: e.target.value })}
                    />
                </div>

                <Divider type="vertical" className="hidden sm:block h-10 bg-gray-300"/>

                <div className="flex items-center w-full sm:w-1/4">
                    <SearchOutlined className="text-gray-700 text-xl"/>
                    <Input
                        size="small"
                        variant="borderless"
                        placeholder={t('destination')}
                        className="text-gray-700 w-full"
                        value={filters.destination}
                        onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                    />
                </div>

                <Divider type="vertical" className="hidden sm:block h-10 bg-gray-300"/>

                <div className="flex items-center w-full sm:w-1/6">
                    <CalendarOutlined className="text-gray-700 text-xl"/>
                    <div>
                        <p className="text-gray-600 text-xs ml-2">{t('date')}</p>
                        <DatePicker
                            suffixIcon={null}
                            variant="borderless"
                            size="small"
                            placeholder={t('date')}
                            className="text-gray-700 text-xs w-full"
                            format="DD MMM"
                            value={filters.date ? moment(filters.date) : null} // Değer varsa moment ile oluşturulmuş olmalı
                            onChange={(date) => setFilters({ ...filters, date: date ? date.format("YYYY-MM-DD") : "" })}
                        />
                    </div>
                </div>


                <Divider type="vertical" className="hidden sm:block h-10 bg-gray-300"/>

                <div className="flex items-center w-full sm:w-1/6">
                    <MoonOutlined className="text-gray-700 text-xl"/>
                    <div>
                        <p className="text-gray-600 text-xs ml-2">{t('nights')}</p>
                    <Select
                        variant="borderless"
                        defaultValue="1 Night"
                        size="small"
                        className="text-gray-700 w-full"
                        value={filters.nights}
                        onChange={(value) => setFilters({...filters, nights: value})}
                        suffixIcon={null}
                    >
                        {nightOptions.map((night) => (
                            <Option key={night} value={night}>
                                {night}
                            </Option>
                        ))}
                    </Select>
                    </div>
                </div>

                <Divider type="vertical" className="hidden sm:block h-10 bg-gray-300"/>

                <div className="flex items-center w-full sm:w-1/6">
                    <TeamOutlined className="text-gray-700 text-xl"/>
                    <div>
                        <p className="text-gray-600 text-xs ml-2">{t('participants')}</p>
                        <Select
                            variant="borderless"
                            defaultValue="2 People"
                            size="small"
                            className="text-gray-700 w-full"
                            value={filters.people}
                            onChange={(value) => setFilters({...filters, people: value})}
                            suffixIcon={null}
                        >
                            {peopleOptions.map((people) => (
                                <Option key={people} value={people}>
                                    {people}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    </div>
                </div>

                <Button
                    onClick={handleSearchClick}
                    type="primary"
                size="small"
                className="bg-orange-500 text-white font-semibold p-6 sm:p-6 m-4 rounded-md w-full sm:w-1/4 sm:h-full custom-search-button"
            >
                {t('search')}
            </Button>
        </div>
    );
}
