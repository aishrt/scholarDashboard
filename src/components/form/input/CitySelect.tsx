import { useState, useEffect } from 'react';
import Select from '../Select';
import Label from '../Label';

interface City {
  name: string;
}

interface CitySelectProps {
  value: string;
  onChange: (value: string) => void;
  country: string;
  state: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export default function CitySelect({ 
  value, 
  onChange, 
  country,
  state,
  label = "City", 
  required = false,
  error
}: CitySelectProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (!country || !state) {
        setCities([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://countriesnow.space/api/v0.1/countries/state/cities`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            country: country.split(' (')[0],
            state: state.split(' (')[0]
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }

        const data = await response.json();
        if (data.data) {
          const formattedCities = data.data
            .map((city: string) => ({
              name: city
            }))
            .sort((a: City, b: City) => a.name.localeCompare(b.name));
          
          setCities(formattedCities);
        } else {
          setCities([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cities:', err);
        setErrorMessage('Failed to load cities. Please try again later.');
        setLoading(false);
      }
    };

    fetchCities();
  }, [country, state]);

  const cityOptions = cities.map(city => ({
    value: city.name,
    label: city.name
  }));

  return (
    <div>
      <Label htmlFor="city">
        {label}
        {/* {required && <span className="text-red-500 ml-1">*</span>} */}
      </Label>
      <Select
        options={cityOptions}
        placeholder={loading ? "Loading cities..." : "Select a city"}
        onChange={onChange}
        defaultValue={value}
        className="dark:bg-dark-900"
      />
      {(error || errorMessage) && (
        <p className="mt-1 text-sm text-red-500">{error || errorMessage}</p>
      )}
    </div>
  );
} 