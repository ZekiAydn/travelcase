import { Checkbox, Button } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

const HotelConceptSelector: React.FC = () => {
    const { t } = useTranslation('common');
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleCheckboxChange = (checkedValues: string[]) => {
        setSelectedValues(checkedValues);
    };

    const handleReset = () => {
        setSelectedValues([]);
    };

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-xs">{t('hotelConcept')}</label>
                {selectedValues.length > 0 && (
                    <Button
                        type="link"
                        className="text-orange-500 text-xs"
                        onClick={handleReset}
                    >
                        {t('reset')}
                    </Button>
                )}
            </div>
            <Checkbox.Group
                className="flex flex-col space-y-2"
                value={selectedValues}
                onChange={handleCheckboxChange}
            >
                <Checkbox value={t('beachHotel')} className="custom-checkbox">{t('beachHotel')}</Checkbox>
                <Checkbox value={t('adultHotel')} className="custom-checkbox">{t('adultHotel')}</Checkbox>
                <Checkbox value={t('boutiqueHotel')} className="custom-checkbox">{t('boutiqueHotel')}</Checkbox>
                <Checkbox value={t('familyHotel')} className="custom-checkbox">{t('familyHotel')}</Checkbox>
                <Checkbox value={t('petFriendly')} className="custom-checkbox">{t('petFriendly')}</Checkbox>
            </Checkbox.Group>
        </div>
    );
};

export default HotelConceptSelector;
