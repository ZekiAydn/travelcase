import { CalendarOutlined, EnvironmentOutlined, MoonOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, DatePicker, Divider, Input, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';

const { Option } = Select;

export default function SearchFilter() {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [filters, setFilters] = useState({
        from: "",
        destination: "",
        date: moment().format("DD MMM YYYY"),
        nights: "1 Night",
        people: "2 People",
    });

    const handleSearchClick = () => {
        const queryString = new URLSearchParams(filters).toString();
        router.push(`/result?${queryString}`);
    };

    const nightOptions = Array.from(
        { length: 30 },
        (_, i) => `${i + 1} ${t('night', { count: i + 1 })}`
    );
    const peopleOptions = Array.from(
        { length: 30 },
        (_, i) => `${i + 1} ${t('person', { count: i + 1 })}`
    );

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
                    <DatePicker
                        variant="borderless"
                        size="small"
                        placeholder={t('date')}
                        className="text-gray-700 text-xs w-full"
                        format="DD MMM"
                        defaultValue={moment()}
                        value={moment(filters.date, "DD MMM YYYY")}
                        onChange={(date) => setFilters({ ...filters, date: date?.format("DD MMM YYYY") || filters.date })}
                    />
                </div>

                <Divider type="vertical" className="hidden sm:block h-10 bg-gray-300"/>

                <div className="flex items-center w-full sm:w-1/6">
                    <MoonOutlined className="text-gray-700 text-xl"/>
                    <Select
                        variant="borderless"
                        defaultValue="1 Night"
                        size="small"
                        className="text-gray-700 w-full"
                        value={filters.nights}
                        onChange={(value) => setFilters({ ...filters, nights: value })}
                    >
                        {nightOptions.map((night) => (
                            <Option key={night} value={night}>
                                {night}
                            </Option>
                        ))}
                    </Select>
                </div>

                <Divider type="vertical" className="hidden sm:block h-10 bg-gray-300"/>

                <div className="flex items-center w-full sm:w-1/6">
                    <TeamOutlined className="text-gray-700 text-xl"/>
                    <Select
                        variant="borderless"
                        defaultValue="2 People"
                        size="small"
                        className="text-gray-700 w-full"
                        value={filters.people}
                        onChange={(value) => setFilters({ ...filters, people: value })}
                    >
                        {peopleOptions.map((people) => (
                            <Option key={people} value={people}>
                                {people}
                            </Option>
                        ))}
                    </Select>
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
