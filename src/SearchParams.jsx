// Dependencies
import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Fetch
import { fetchSearch } from './fetchSearch';

// Components
import { Results } from './Results';

// Custom Hooks
import { useBreedList } from './useBreedList';
import { AdoptedPetContext } from './AdoptedPetContext';

// Constants
const ANIMAL = ['dog', 'cat', 'bird', 'rabbit', 'reptile'];

export const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: '',
    animal: '',
    breed: '',
  });
  const [animal, setAnimal] = useState('');
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(['search', requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className={'search-params'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get('animal') ?? '',
            location: formData.get('location') ?? '',
            breed: formData.get('breed') ?? '',
          };

          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="Location..." />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMAL.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select name="breed" id="breed" disabled={!breeds.length}>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
