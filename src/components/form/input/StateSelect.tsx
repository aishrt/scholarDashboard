import { useState, useEffect } from 'react';
import Select from '../Select';
import Label from '../Label';

interface State {
  name: string;
  code: string;
}

interface StateSelectProps {
  value: string;
  onChange: (value: string) => void;
  country: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export default function StateSelect({ 
  value, 
  onChange, 
  country,
  label = "State", 
  required = false,
  error
}: StateSelectProps) {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log("country",country);
  useEffect(() => {
    const fetchStates = async () => {
      if (!country) {
        setStates([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMessage(null);

      try {
        // Get country name from the selected value

        const requestBody = { country };
        console.log('Request body:', requestBody);

        const response = await fetch('https://countriesnow.space/api/v0.1/countries/states', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log('Full API response:', data);

        if (!response.ok || data.error) {
          console.error('API Error Details:', {
            status: response.status,
            statusText: response.statusText,
            data: data
          });
          throw new Error(data.msg || `Failed to fetch states: ${response.status}`);
        }

        if (data.data?.states && Array.isArray(data.data.states)) {
          const formattedStates = data.data.states
            .map((state: any) => ({
              name: state.name,
              code: state.state_code || state.name
            }))
            .sort((a: State, b: State) => a.name.localeCompare(b.name));
          
          console.log('Formatted states:', formattedStates);
          setStates(formattedStates);
        } else {
          console.log('No states found in response. Response structure:', data);
          setStates([]);
        }
      } catch (err) {
        console.error('Error fetching states:', err);
        setErrorMessage(err instanceof Error ? err.message : 'Failed to load states. Please try again later.');
        setStates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, [country]);

  const stateOptions = states.map(state => ({
    value: state.name,
    label: state.name
  }));

  return (
    <div>
      <Label htmlFor="state">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select
        options={stateOptions}
        placeholder={loading ? "Loading states..." : "Select a state"}
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