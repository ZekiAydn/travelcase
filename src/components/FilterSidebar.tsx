import { Input, Select, DatePicker, Radio, Button } from "antd";
import { CalendarOutlined, EnvironmentOutlined, GlobalOutlined, MoonOutlined, TeamOutlined, FilterOutlined, StarFilled } from "@ant-design/icons";
import { useTranslation } from 'next-i18next';
import dayjs, {Dayjs} from "dayjs";
import React, {useState} from "react";
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


const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, nightOptions, peopleOptions}) => {
    const [filtersOpen, setFiltersOpen] = useState(true)
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
            <div className="lg:hidden flex items-end justify-between">
                <span></span>
                <Button
                    type="text"
                    icon={<FilterOutlined/>}
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
                            variant={"borderless"}
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
                            variant="borderless"
                            placeholder={t('date')}
                            format="DD MMM"
                            value={selectedDate}
                            onChange={(date) =>handleDateChange(date)}
                            className="w-full rounded-md"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="text-xs mb-4">{t('nights')}</label>
                    <div className="flex items-center space-x-2 w-full sm:w-auto border rounded-lg">
                        <MoonOutlined style={{ color: "#4A5568", marginLeft: 14 }} />
                        <Select
                            variant={"borderless"}
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
