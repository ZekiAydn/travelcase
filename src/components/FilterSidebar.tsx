import { Input, Select, DatePicker, Radio, Button } from "antd";
import { CalendarOutlined, EnvironmentOutlined, GlobalOutlined, MoonOutlined, TeamOutlined, FilterOutlined, StarFilled } from "@ant-design/icons";
import { useTranslation } from 'next-i18next';
import dayjs, { Dayjs } from "dayjs";
import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import HotelConceptSelector from "@/components/ConceptSelector";

const { Option } = Select;

interface FilterParams {
    from: string;
    destination: string;
    date: string;
    nights: string;
    people: string;
    rating: string;
}

interface FilterSidebarProps {
    filters: FilterParams;
    setFilters: (key: keyof FilterParams, value: string) => void;
    nightOptions: string[];
    peopleOptions: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, nightOptions, peopleOptions }) => {
    const [filtersOpen, setFiltersOpen] = useState(true);
    const { t } = useTranslation('common');
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(filters.date));
    const [localFilters, setLocalFilters] = useState<FilterParams>(filters);

    // Debounced setFilters function
    const debouncedSetFilters = useCallback(
        debounce((key: keyof FilterParams, value: string) => {
            setFilters(key, value);
        }, 300), // 300ms debounce delay
        [setFilters]
    );

    const handleInputChange = (key: keyof FilterParams, value: string) => {
        setLocalFilters((prev) => ({ ...prev, [key]: value }));
        debouncedSetFilters(key, value); // Filters only apply after typing stops for 300ms
    };

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
        const dateValue = date ? date.format("YYYY-MM-DD") : "";
        setLocalFilters((prev) => ({ ...prev, date: dateValue }));
        debouncedSetFilters("date", dateValue);
    };

    return (
        <>
            <div className="lg:hidden flex items-end justify-between">
                <Button
                    type="text"
                    icon={<FilterOutlined />}
                    onClick={() => setFiltersOpen(!filtersOpen)}
                >
                    {filtersOpen ? t('hideFilters') : t('showFilters')}
                </Button>
            </div>
            <div className={`filter-sidebar ${filtersOpen ? "block" : "hidden"} lg:block`}>
                <h2 className="text-xs">{t('filter')}</h2>

                <div className="mb-4">
                    <Input
                        size="large"
                        placeholder={t('from')}
                        prefix={<EnvironmentOutlined style={{ color: "#4A5568" }} />}
                        className="rounded-md"
                        value={localFilters.from}
                        onChange={(e) => handleInputChange("from", e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        size="large"
                        placeholder={t('destination')}
                        prefix={<GlobalOutlined style={{ color: "#4A5568" }} />}
                        className="rounded-md"
                        value={localFilters.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="text-xs mb-4">{t('participants')}</label>
                    <div className="flex items-center space-x-2 w-full sm:w-auto border rounded-lg">
                        <TeamOutlined style={{ color: "#4A5568", marginLeft: 14 }} />
                        <Select
                            size="large"
                            className="w-full"
                            value={localFilters.people}
                            onChange={(val) => handleInputChange("people", val)}
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
                            placeholder={t('date')}
                            format="DD MMM"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="w-full rounded-md"
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
                            value={localFilters.nights}
                            onChange={(val) => handleInputChange("nights", val)}
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
                    onChange={(e) => handleInputChange("rating", e.target.value)}
                    value={localFilters.rating}
                >
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Radio key={value} value={value.toString()}>
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
