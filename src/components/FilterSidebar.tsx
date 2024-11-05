import { Input, Select, Button, Radio, DatePicker } from "antd";
import { CalendarOutlined, EnvironmentOutlined, GlobalOutlined, MoonOutlined, TeamOutlined, FilterOutlined, StarFilled } from "@ant-design/icons";
import { useTranslation } from 'next-i18next';
import HotelConceptSelector from "@/components/ConceptSelector";
import moment from "moment";
import React from "react";

const { Option } = Select;

interface FilterSidebarProps {
    filters: {
        from: string;
        destination: string;
        date: string;
        nights: string;
        people: string;
    };
    setFilters: (key: string, value: string) => void;
    nightOptions: string[];
    peopleOptions: string[];
    filtersOpen: boolean;
    setFiltersOpen: (open: boolean) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, nightOptions, peopleOptions, filtersOpen, setFiltersOpen }) => {
    const { t } = useTranslation('common');

    return (
        <>
        <div className="lg:hidden flex items-center self-end justify-between">
            <Button
                type="text"
                icon={<FilterOutlined/>}
                onClick={() => setFiltersOpen(!filtersOpen)}
            >
                {filtersOpen ? t('hideFilters') : t('showFilters')}
            </Button>
        </div>
    <div className={`${filtersOpen ? "block" : "hidden"} lg:block lg:w-1/4 bg-white border p-6 rounded-lg`}>

        <h2 className="text-xs">{t('filter')}</h2>

        <div className="mb-4">
            <Input
                size="large"
                placeholder={t('from')}
                prefix={<EnvironmentOutlined style={{color: "#4A5568"}}/>}
                className="rounded-md"
                    value={filters.from}
                    onChange={(e) => setFilters("from", e.target.value)}
                />
            </div>

            <div className="mb-4">
                <Input
                    size="large"
                    placeholder={t('destination')}
                    prefix={<GlobalOutlined style={{ color: "#4A5568" }} />}
                    className="rounded-md"
                    value={filters.destination}
                    onChange={(e) => setFilters("destination", e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="text-xs mb-4">{t('participants')}</label>
                <div className="flex items-center space-x-2 w-full sm:w-auto border rounded-lg">
                    <TeamOutlined style={{ color: "#4A5568", marginLeft: 14 }} />
                    <Select
                        size="large"
                        className="w-full"
                        value={filters.people}
                        onChange={(val) => setFilters("people", val)}
                    >
                        {peopleOptions.map((peopleOption) => (
                            <Option key={peopleOption} value={peopleOption}>
                                {peopleOption}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>

            <div className="mb-4">
                <label className="text-xs mb-4">{t('date')}</label>
                <div className="flex items-center space-x-2 w-full sm:w-auto border rounded-lg">
                    <CalendarOutlined className="text-gray-700 text-xl ml-3" />
                    <DatePicker
                        size="large"
                        placeholder={t('selectDate')}
                        className="rounded-md w-full"
                        format="DD MMM YYYY"
                        value={moment(filters.date, "DD MMM YYYY")}
                        onChange={(date) => setFilters("date", date ? date.format("DD MMM YYYY") : "")}
                    />
                </div>
            </div>

            <div className="mb-4">
                <label className="text-xs mb-4">{t('nights')}</label>
                <div className="flex items-center space-x-2 w-full sm:w-auto border rounded-lg">
                    <MoonOutlined style={{ color: "#4A5568", marginLeft: 14 }} />
                    <Select
                        size="large"
                        className="w-full"
                        value={filters.nights}
                        onChange={(val) => setFilters("nights", val)}
                    >
                        {nightOptions.map((nightOption) => (
                            <Option key={nightOption} value={nightOption}>
                                {nightOption}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>

            <HotelConceptSelector />

            <h3 className="text-xs mt-4">{t('star')}</h3>
            <Radio.Group
                className="flex flex-col space-y-2 custom-ratio-input"
                onChange={(e) => setFilters("rating", e.target.value)}
            >
                {[1, 2, 3, 4, 5].map((value) => (
                    <Radio key={value} value={`${value}+`}>
                        {[...Array(value)].map((_, index) => (
                            <StarFilled key={index} style={{ color: "#FFA500" }} />
                        ))}{" "}
                        {value}+
                    </Radio>
                ))}
            </Radio.Group>
        </div>
        </>
    );
};

export default FilterSidebar;
