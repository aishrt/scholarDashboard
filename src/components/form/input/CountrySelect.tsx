import { useState, useEffect } from 'react';
import Select from '../Select';
import Label from '../Label';

interface Country {
  name: string;
  code: string;
  code3: string;
}

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  error?: string;
}

export default function CountrySelect({ 
  value, 
  onChange, 
  label = "Country", 
  required = false,
  error
}: CountrySelectProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        const formattedCountries = data.data
          .map((country: any) => ({
            name: country.country,
            code: country.iso2
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        
        setCountries(formattedCountries);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setErrorMessage('Failed to load countries. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const countryOptions = countries.map(country => ({
    value: country.name,
    label: `${country.name} (${country.code})`
  }));

  // Find the matching country option for the current value
  const selectedCountry = countryOptions.find(option => 
    option.value.toLowerCase() === value.toLowerCase() || 
    option.label.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      <Label htmlFor="country">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        options={countryOptions}
        placeholder={loading ? "Loading countries..." : "Select a country"}
        onChange={onChange}
        value={selectedCountry?.value || value}
        className="dark:bg-dark-900"
      />
      {(error || errorMessage) && (
        <p className="mt-1 text-sm text-red-500">{error || errorMessage}</p>
      )}
    </div>
  );
} 