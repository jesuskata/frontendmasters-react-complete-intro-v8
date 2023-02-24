// Components
import { Pet } from './Pet';

export const Results = ({ pets }) => (
  <div className="search">
    {!pets.length ? (
      <h1>No pets found...</h1>
    ) : (
      pets.map((pet) => (
        <Pet
          id={pet.id}
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          location={`${pet.city}, ${pet.name}`}
          images={pet.images}
          key={pet.id}
        />
      ))
    )}
  </div>
);
