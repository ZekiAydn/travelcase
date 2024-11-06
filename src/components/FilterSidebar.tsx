import { Input, Select, DatePicker, Radio, Button } from "antd";
import { CalendarOutlined, EnvironmentOutlined, GlobalOutlined, MoonOutlined, TeamOutlined, FilterOutlined, StarFilled } from "@ant-design/icons";
import { useTranslation } from 'next-i18next';
import dayjs, {Dayjs} from "dayjs";
import React, {useState} from "react";

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
    filtersOpen: boolean;
    setFiltersOpen: (open: boolean) => void;
}


const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, nightOptions, peopleOptions, filtersOpen, setFiltersOpen }) => {
    const { t } = useTranslation('common');
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(filters.date));


    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
        if (date) {
            setFilters("date", date.format("YYYY-MM-DD"));
        } else {
            setFilters("date", "");
        }
    };

    return (
        <>
            <div className="lg:hidden flex items-center justify-end p-4">
                <Button
                    type="text"
                    icon={<FilterOutlined />}
                    onClick={() => setFiltersOpen(!filtersOpen)}
                >
                    {filtersOpen ? t('hideFilters') : t('showFilters')}
                </Button>
            </div>
            <div className={`filter-sidebar ${filtersOpen ? "block" : "hidden"} lg:block`}>
                <h2 className="filter-title">{t('filter')}</h2>

                {/* From Input */}
                <div className="filter-item">
                    <Input
                        size="large"
                        placeholder={t('from')}
                        prefix={<EnvironmentOutlined className="filter-icon" />}
                        value={filters.from}
                        onChange={(e) => setFilters("from", e.target.value)}
                    />
                </div>

                {/* Destination Input */}
                <div className="filter-item">
                    <Input
                        size="large"
                        placeholder={t('destination')}
                        prefix={<GlobalOutlined className="filter-icon" />}
                        value={filters.destination}
                        onChange={(e) => setFilters("destination", e.target.value)}
                    />
                </div>

                {/* Participants Select */}
                <div className="filter-item">
                    <label className="filter-label">{t('participants')}</label>
                    <div className="filter-input">
                        <TeamOutlined className="filter-icon" />
                        <Select
                            size="large"
                            className="w-full"
                            value={filters.people}
                            onChange={(val) => setFilters("people", val)}
                        >
                            {peopleOptions.map((option) => (
                                <Option key={option} value={option}>
                                    {option}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* Date Picker */}
                <div className="filter-item">
                    <label className="filter-label">{t('date')}</label>
                    <div className="filter-input">
                        <CalendarOutlined className="filter-icon" />
                        <DatePicker
                            size="large"
                            placeholder={t('date')}
                            format="DD MMM"
                            value={selectedDate}
                            onChange={(date) =>handleDateChange(date)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Nights Select */}
                <div className="filter-item">
                    <label className="filter-label">{t('nights')}</label>
                    <div className="filter-input">
                        <MoonOutlined className="filter-icon" />
                        <Select
                            size="large"
                            value={filters.nights}
                            onChange={(val) => setFilters("nights", val)}
                            className="w-full"
                        >
                            {nightOptions.map((option) => (
                                <Option key={option} value={option}>
                                    {option}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* Star Rating */}
                <div className="filter-item">
                    <label className="filter-label">{t('star')}</label>
                    <Radio.Group onChange={(e) => setFilters("rating", e.target.value)} className="filter-radio-group">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <Radio key={value} value={`${value}+`}>
                                {[...Array(value)].map((_, index) => (
                                    <StarFilled key={index} className="star-icon" />
                                ))}{" "}
                                {value}+
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
            </div>
        </>
    );
};

export default FilterSidebar;
